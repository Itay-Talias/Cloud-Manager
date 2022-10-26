from fastapi import HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param
from DB.sql_queries_constants import SELECT_USERINFO_BY_DETAILES
from DB.db_manager import execute_select_query


db = {
    "itayt": {
        "username": "itayt",
        "password": "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.",
        "company": "cyberark"
    },
    "yagelp": {
        "username": "yagelp",
        "password": "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.",
        "company": "cyberark"

    },
    "dekell": {
        "username": "dekell",
        "password": "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.",
        "company": "cyberark"
    },
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_from_db(username: str):
    return execute_select_query(SELECT_USERINFO_BY_DETAILES, [username])


async def get_current_user(request: Request):
    header_authorization: str = request.headers.get("Authorization")
    cookie_authorization: str = request.cookies.get("Authorization")

    header_scheme, header_param = get_authorization_scheme_param(
        header_authorization)
    cookie_scheme, cookie_param = get_authorization_scheme_param(
        cookie_authorization)

    if header_scheme.lower() == "bearer":
        authorization = True
        scheme = header_scheme
        param = header_param

    elif cookie_scheme.lower() == "bearer":
        authorization = True
        scheme = cookie_scheme
        param = cookie_param

    else:
        authorization = False

    if not authorization or scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated"
        )

    return param
