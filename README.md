
## Social Media Server
### Documentation
This is the **REST** based API implementation for a **Product** website. More details about the server can be found out in this repository.


![Code base](https://github.com/lonebots/product-api-server/blob/main/resources/product-api-server-codebase.png)
[reference link](https://www.youtube.com/watch?v=goUbHgAzPCs&t=377s)

The technologies used are : 

- **Node**
- **Express**
- **MongoDB**
- **Typescript**

The tools used are : 

- **VSCode**
- **Postman**

### Run Locally
- **Setup the Repository**
    - clone the git respository
    - update the config variables in the **/config** folder - add the **dbUri**, **privateKey**, **publicKey** 
    - navigate to the directory **/socialmedia-api-server**
    - run the command in the terminal `yarn install` followed by `yarn dev`, it will start  the server in the default post or the port you set in the configuration.
- **Setup the Postman API Service**
    - Go to PostMan App.
    - Navigate to *import* on the *file* menu, upload the file *product-api-server.postman_collection.json* in the *resource* folder.
    - Create the **environment variables** mentioned bellow 
        -  port, accessToken, refreshToken, email, password, postId.

### Functionality
The basic functionality that can be acomplished by the server are listed bellow.
- For user 
    - Create user 
    - **login**
    - **logout**
    - Retrieve user sessions

- For Post
    - Create product
    - Update product details
    - Retrieve products 
    - Delete product


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@lonebots](https://www.github.com/lonebots)

