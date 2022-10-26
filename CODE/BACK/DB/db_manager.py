import pymysql as mysql
from typing import List

try:
    CONNECTOR = mysql.connect(
        host="localhost",
        user="root",
        password="",
        db="sql_users_cloud_manager",
        charset="utf8",
        cursorclass=mysql.cursors.DictCursor
    )
except Exception as e:
    print(e)


def execute_select_query(sql_query: str, params: List):
    try:
        with CONNECTOR.cursor() as cursor:
            cursor.execute(
                sql_query, params)
            result = cursor.fetchone()
            return result
    except Exception as e:
        return e
