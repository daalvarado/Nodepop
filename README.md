Nodepop
KC Practica Node Fundamentos

Diego Alvarado


1. start mongoose server on port 27027
2. load node modules: npm install
3. initialize database: npm run dbinit
4. initialize node server: npm run dev

Pages:

"localhost:3000": main page - ads listing
"localhost:3000/new": new listing
"localhost:3000/users": list of users (json)
"localhost:3000/apiv1": api (json)


filters:
*enabled for the following pages:
    "localhost:3000" -> to query: "localhost:3000/?" 
    "localhost:3000/apiv1" -> to query: "localhost:3000/apiv1?"

*fields to be filtered:
    - name: first letters of the ad name
    - price: 
        x: exact price match x
        x-: prices x and greater
        -x: prices up to x
        x-y: prices between x and y
    - sale: true/false
    - tags: tag to be matched

*filter functions:
    - sort: according to a field
    - limit: number of ads per page
    - skip: number of page to view
    - fields: show only specific field in ad view


