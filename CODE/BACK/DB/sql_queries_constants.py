from tkinter.tix import Select


SELECT_USERNAME_BY_DETAILES = """SELECT username 
                            FROM Users_info 
                            WHERE username=%s AND password=%s AND comapny=%s"""
SELECT_PASSWORD_BY_DETAILES = """SELECT password 
                            FROM Users_info 
                            WHERE username=%s AND password=%s AND comapny=%s"""
SELECT_COMPANY_BY_DETAILES = """SELECT company 
                            FROM Users_info 
                            WHERE username=%s AND password=%s AND comapny=%s"""
SELECT_USERINFO_BY_DETAILES = """SELECT * 
                            FROM Users_info 
                            WHERE username=%s AND password=%s AND comapny=%s"""
