import jwt

from app.core.config import settings


def set_up():
    """Sets up and returns the necessary configuration for the application using
    settings from the 'settings' object. This includes details specific to Auth0
    integration such as domain, API audience, issuer, and algorithms used for JWT.

    Returns:
        dict: A dictionary containing configuration parameters.
    """
    # Load and return configuration settings from the settings module, which contains
    # environment-specific values.
    return {
        "DOMAIN": settings.AUTH0_DOMAIN,
        "API_AUDIENCE": settings.AUTH0_API_AUDIENCE,
        "ISSUER": settings.AUTH0_ISSUER,
        "ALGORITHMS": settings.AUTH0_ALGORITHMS,
    }


class VerifyToken:
    """A class dedicated to verifying JWT tokens using PyJWT and configurations set for
    Auth0.

    It handles decoding JWTs, validating claims such as permissions and scopes, and
    ensures that the token is from a trusted issuer.
    """

    def __init__(self, token, permissions=None, scopes=None):
        """Initializes the VerifyToken instance.

        Args:
            token (str): The JWT token to be verified.
            permissions (list, optional): List of permissions required to access the
                resource.
            scopes (str, optional): Space-separated string of scopes required to access
                the resource.

        Attributes:
            token (str): Stores the JWT token.
            permissions (list): Stores the required permissions.
            scopes (str): Stores the required scopes as a string.
            config (dict): Configuration parameters loaded via the set_up function.
            jwks_client (jwt.PyJWKClient): Client to fetch and handle JWKS for token
                verification.
        """
        self.token = token  # Store the JWT to be verified.
        self.permissions = permissions  # Store the permissions needed for access.
        self.scopes = scopes  # Store the scopes as a space-separated string.
        self.config = set_up()  # Load configuration settings.
        # Construct the URL to fetch JWKS using the domain from config.
        jwks_url = f'https://{self.config["DOMAIN"]}/.well-known/jwks.json'
        self.jwks_client = jwt.PyJWKClient(jwks_url)  # Initialize JWKS client with URL.

    def verify(self):
        """Verifies the JWT stored in this instance.

        Attempts to decode the JWT using the signing key obtained from the JWKS client,
        validate the claims such as audience and issuer, and checks permissions and
            scopes if specified.

        Returns:
            dict: A dictionary with the payload if successful, or an error message and
                status if not.
        """
        try:
            # Retrieve the signing key from the JWKS endpoint using the JWKS client.
            self.signing_key = self.jwks_client.get_signing_key_from_jwt(self.token).key
        except (jwt.exceptions.PyJWKClientError, jwt.exceptions.DecodeError) as error:
            # Return an error if the key cannot be retrieved or the JWT cannot be
            # decoded.
            return {"status": "error", "msg": error.__str__()}
        try:
            # Decode the JWT using the retrieved key and configuration settings.
            payload = jwt.decode(
                self.token,
                self.signing_key,
                algorithms=self.config["ALGORITHMS"],
                audience=self.config["API_AUDIENCE"],
                issuer=self.config["ISSUER"],
            )
        except Exception as e:
            # Catch all other exceptions during decoding and return an error message.
            return {"status": "error", "msg": str(e)}
        # Check if scopes are defined and verify them against the payload.
        if self.scopes:
            result = self._check_claims(payload, "scope", str, self.scopes.split(" "))
            if result.get("error"):
                return result
        # Check if permissions are defined and verify them against the payload.
        if self.permissions:
            result = self._check_claims(payload, "permissions", list, self.permissions)
            if result.get("error"):
                return result
        return payload  # Return the decoded payload if all checks pass.

    def _check_claims(self, payload, claim_name, claim_type, expected_value):
        """Helper method to check specific claims in the token payload against expected
        values.

        Args:
            payload (dict): The decoded JWT payload.
            claim_name (str): Name of the claim to check.
            claim_type (type): The expected type of the claim value.
            expected_value (list or str): The expected values of the claim.

        Returns:
            dict: Result of the check, including status and any error messages if the
                check fails.
        """
        # Check if the payload contains the claim and if it matches the expected type.
        instance_check = isinstance(payload.get(claim_name), claim_type)
        result = {"status": "success", "status_code": 200}
        payload_claim = payload.get(
            claim_name
        )  # Extract the claim value from the payload.
        # Handle the case where the claim is missing or the type does not match.
        if not instance_check or payload_claim is None:
            result.update(
                {
                    "status": "error",
                    "status_code": 400,
                    "code": f"missing_{claim_name}",
                    "msg": f"No claim '{claim_name}' found in token.",
                }
            )
            return result
        # Special handling for 'scope' which is a space-separated string in the payload.
        if claim_name == "scope":
            payload_claim = payload_claim.split(" ")
        # Check each expected value against the claim in the payload.
        for value in expected_value:
            if value not in payload_claim:
                result.update(
                    {
                        "status": "error",
                        "status_code": 403,
                        "code": f"insufficient_{claim_name}",
                        "msg": (
                            f"Insufficient {claim_name} ({value})."
                            " You don't have access to this resource"
                        ),
                    }
                )
                return result
        return result  # Return success result if all values are present.
