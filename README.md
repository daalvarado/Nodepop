# Nodepop API
## KC Practica Node Fundamentos

** Diego Alvarado **

### Installation

1. start mongoose server on port 27017
2. load node modules: npm install
3. initialize database: npm run dbinit
4. initialize node server: npm run dev

### Views:

#### "localhost:3000": main page - ads listing
    Allows for filters & queries as detailed in the Fields & Queries section using localhost:3000/?


#### "localhost:3000/new": new listing
    Fields for new listing:
        **name**:   - name of product to be listed
                    - string
                    - required field
        **sale**:   - accepted values: true or false:
                        - true if product is for sale
                        - false if product is for purchase
                    - required field
        **price**:  - Price for product to be sold/purchased
                    - Accepted values: Number larger than 0.01 with up to 2 decimal places
                    - Required field
        **picture**:- html address of picture of product
                    - optional field
        **tags**:   - classification of product
                    - up to 4 tags are possible
                    - must be separated by commas, no quotation marks
                    - accepted values:
                        - lifestyle
                        - mobile
                        - motor
                        - work


#### "localhost:3000/users": list of users (json)

#### "localhost:3000/apiv1": api (json)
    - List of all data on ads database
    - Allows for filters & queries as detailed in the Fields & Queries    section
    - Post method to address http://localhost:3000/apiv1
        Data to be posted must be included in x-wwww-form-urlencoded or raw-JSON formats
        Fields: name, sale, price, picture, tags with same characteristics as detailed in /new
    - Delete method to address http://localhost:3000/apiv1/:id
    - Put method to address http://localhost:3000/apiv1/:id


### Filters & Queries:
*enabled for the following pages:
    "localhost:3000" -> to query: "localhost:3000/?" 
    "localhost:3000/apiv1" -> to query: "localhost:3000/apiv1?"

    #### fields to be queried:
    **- name:** first letters of the ad name
    **- price:** 
        x: exact price match x
        x-: prices x and greater
        -x: prices up to x
        x-y: prices between x and y
    **- sale:** true/false
    **- tags:** tag to be matched

    #### filter functions:
    - sort: according to a field
    - limit: number of ads per page
    - skip: number of page to view
    - fields: show only specific field in ad view


