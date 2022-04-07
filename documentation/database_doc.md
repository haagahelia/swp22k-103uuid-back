# Database Documentation


## Setup (Step By Step)
>**Linux Version: Ubuntu 20+**  
>Brackets contain bash commands respective to the current step.

>Variables to replace with your own:
> - **program_user:** username for the user that the program will use to access the database. 
> - **secure_password:** your own password for the program. 
> - **database_name:** a name for the database that will store the program data. 


>**Note:** Some of the commands have to be either ran with the sudo prefix or as a root user.
1. Update & upgrade packet manager (`apt update && apt upgrade`).
2. Install the mariadb packet (`apt install mariadb-server`).
3. Setup mariadb (`mysql_secure_installation`).
    1. Leave password empty and press enter.
    2. Enter (`Y`) for set root password.
    3. Enter a root/admin password twice.
    4. Enter (`Y`) for remove anonymous users.
    5. Enter (`Y`) for disallow root login remotely.
    6. Enter (`Y`) for remove test databases.
    7. Enter (`Y`) for reload privilege table.
4. Open mariadb (`mariadb`).
5. Create a user for the program (SQL: `CREATE USER 'program_user'@'localhost' IDENTIFIED BY 'secure_password';`).
6. **OPTIONAL** Check if user exists (SQL: `SELECT User FROM mysql.user;`).![][img1]
7. Create database (SQL: `CREATE DATABASE database_name;`).
8. Now you can grant the user all privileges (SQL: `GRANT ALL PRIVILEGES ON database_name.* TO 'program_user'@'localhost' IDENTIFIED BY 'secure_password';`). If mariadb on the machine will contain other databases you can scope privileges to the project database.
9. Flush privilege table (SQL: `FLUSH PRIVILEGES;`).
10. **OPTIONAL** Check for privileges (SQL: `SHOW GRANTS FOR 'program_user'@'localhost';`).![][img2]
11. Select the database (SQL: `USE database_name;`).
12. Push table structure (SQL: `source database.sql`) this command assumes that you ran the initial `mariadb` command from the same directory where the database.sql file is present.
13. Exit the database (SQL: `exit;`).

[img1]: database_doc_img1.png
[img2]: database_doc_img2.png