import re

import httpx
from bs4 import BeautifulSoup

from app.core.config import settings
from app.schemas.repository import Lang, Repository


def get_repository_langs(url: str) -> list[Lang]:
    """
    Fetches programming language data from a repository's page and extracts details
    about each language's usage within the repository.

    The function sends an HTTP GET request to the specified URL, decodes the response
    content, and then parses it using BeautifulSoup. It searches for language data
    within the repository's layout, extracting the hexadecimal color code, name, and
    usage percentage of each language. If any step fails (like not finding necessary
    HTML elements), appropriate errors are logged, and an empty list is returned.

    Args:
        url (str): The URL of the GitHub repository page from which to scrape the data.

    Returns:
        list[Lang]: A list of Lang objects, where each Lang object contains the color
            (in hexadecimal), name, and usage percentage of a programming language found
            in the repository.
            Returns an empty list if no language data could be extracted.
    """
    langs: list[Lang] = []
    # Regular expression pattern to find hexadecimal color codes
    color_pattern = r"#([0-9a-fA-F]{6})"
    # Send an HTTP GET request to the provided URL and retrieve the response
    response = httpx.get(url)
    content = response.content.decode("utf-8")
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(content, "lxml")
    # Search for the repository information in the specified sidebar by attributes
    repository_info = soup.find_all(
        "div", attrs={"data-view-component": "true", "class": "Layout-sidebar"}
    )
    if not repository_info:
        # TODO: Add log: "Error: Repository information not found"
        return langs
    # Find all categories within the repository information
    categories = repository_info[0].find_all("div", attrs={"class": "BorderGrid-row"})
    if not categories:
        # TODO: Add log: "Error: No categories found within the repository information"
        return langs
    # Assume the last category is the one used for languages
    langs_category = categories[-1]
    langs_group = langs_category.find("ul", attrs={"class": "list-style-none"})
    if not langs_group:
        # TODO: Add log: "Error: Language group not found"
        return langs
    # Find all language elements within the group
    langs_elements = langs_group.find_all("li")
    # Iterate over each extracted language element
    for langs_element in langs_elements:
        # Find and extract the color style of the language icon
        svg_element = langs_element.find("svg")
        if not svg_element:
            # TODO: Add log: "Warning: SVG element not found for a language"
            continue
        style = svg_element.attrs.get("style")
        if not style:
            # TODO: Add log: "Warning: Style attribute not found for the language icon"
            continue
        # Search for the color in the style using the regular expression
        match = re.search(color_pattern, style)
        color = "#" + match.group(1) if match else "#ededed"
        # Extract the name and usage percentage of the language
        properties = langs_element.find_all("span")
        if len(properties) < 2:
            # TODO: Add log: "Warning: Not enough properties found for a language"
            continue
        name = properties[-2].text.strip()
        percentage = properties[-1].text.strip().strip("%")
        langs.append(Lang(color=color, name=name, percentage=percentage))
    return langs


def get_repository_list(
    user: str,
    all_langs: bool = False,
    repository_limit: int = settings.SCRAPER_REPOSITORY_LIMIT,
) -> list[Repository]:
    """
    Fetches a list of repositories from a user's GitHub profile page.

    This function scrapes GitHub to retrieve repository information including name, URL,
    description, and programming languages. It allows for fetching either all
    programming languages associated with each repository or just the main language.
    The function can be limited to return a specified number of repositories.

    Args:
        user (str): The GitHub username from whose profile the repositories will be
            fetched.
        all_langs (bool): If True, fetches all programming languages used in each
            repository.
            If False, only fetches the main programming language. Defaults to False.
        repository_limit (int): The maximum number of repositories to fetch. Defaults to
            the limit defined in settings.

    Returns:
        list: A list of Repository objects, each containing details about a repository
            such as name, URL, description, and a list of programming languages.
    """
    repositories: list[Repository] = []
    # Construct the URL to fetch repositories from a user's GitHub page
    url = f"https://github.com/{user.lower()}?tab=repositories"
    # Loop indefinitely to handle pagination
    while True:
        # Send a GET request to the GitHub URL
        response = httpx.get(url)
        # Decode the response content to UTF-8 format
        content = response.content.decode("utf-8")
        # Parse the decoded HTML content using BeautifulSoup
        soup = BeautifulSoup(content, "lxml")
        # Find all div elements that contain repository information
        divs = soup.find_all("div", class_="col-10 col-lg-9 d-inline-block")
        for div in divs:
            # Check if the current number of repositories has reached the limit
            if len(repositories) >= repository_limit:
                break
            # Find the repository name within the div
            a = div.find("a", itemprop="name codeRepository")
            repository_name = a.text.strip()
            # Construct the complete URL to the repository
            repository_url = "https://github.com" + a["href"]
            # Find the repository description, if available
            p = div.find("p", itemprop="description")
            repository_description = p.text.strip() if p else ""
            # Check if all languages should be fetched or just the main language
            if all_langs:
                # Retrieve all languages used in the repository
                langs = get_repository_langs(repository_url)
            else:
                # Find the main programming language used in the repository
                span = div.find("span", itemprop="programmingLanguage")
                repository_main_lang = span.text.strip() if span else ""
                lang = Lang(name=repository_main_lang)
                langs = [lang]
            # Create a Repository object with the gathered information
            repository = Repository(
                name=repository_name,
                url=repository_url,
                description=repository_description,
                langs=langs,
            )
            # Add the Repository object to the repositories list
            repositories.append(repository)
        # Find the link to the next page of repositories
        next_link = soup.find_all("a", class_="next_page", rel="next")
        # If there is no next page link, return the list of repositories
        if not next_link:
            return repositories
        # Update the URL to the next page
        url = "https://github.com" + next_link[0]["href"]
