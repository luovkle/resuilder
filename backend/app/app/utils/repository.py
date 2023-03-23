from urllib.request import urlopen

from bs4 import BeautifulSoup

from app.schemas.repository import RepositoryRaw


def get_repositories(user: str, limit: int):
    user = user.lower()
    url = f"https://github.com/{user}?tab=repositories"
    repos: list[RepositoryRaw] = []

    while True:
        page = urlopen(url)
        html = page.read().decode("utf-8")

        soup = BeautifulSoup(html, "lxml")

        divs = soup.find_all("div", class_="col-10 col-lg-9 d-inline-block")
        for div in divs:
            if not len(repos) < limit:
                break

            repo_stars = None

            # name, url
            a = div.find("a", itemprop="name codeRepository")
            repo_name = a.text.strip()

            repo_url = "https://github.com" + a["href"]

            # description
            p = div.find("p", itemprop="description")
            repo_description = p.text.strip() if p else ""

            # lang
            span = div.find("span", itemprop="programmingLanguage")
            repo_lang = span.text.strip() if span else ""

            # stars
            svg = div.find("svg", class_="octicon octicon-star")
            repo_stars = svg.parent.text.split()[0] if svg else 0

            # forks
            svg2 = div.find("svg", class_="octicon octicon-repo-forked")
            repo_forks = svg2.parent.text.split()[0] if svg2 else 0

            # repo
            repo = RepositoryRaw(
                name=repo_name,
                url=repo_url,
                description=repo_description,
                lang=repo_lang,
                stars=repo_stars,
                forks=repo_forks,
            )
            repos.append(repo)

        next = soup.find_all("a", class_="next_page", rel="next")

        if not next:
            return repos

        url = "https://github.com" + next[0]["href"]
