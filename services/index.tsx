import request, { gql } from "graphql-request"

export const getCarsLists = async () => {
    const query = gql`
 query CarLists {
  carLists {
    id
    carAvg
    name
    price
    createdAt
    updatedAt
    seat
    image {
      url
    }
    transmission
    mpg
    carBrand
    carType
  }
}
  ` 

  const results = await request('https://eu-west-2.cdn.hygraph.com/content/cmeoex7qa05cm07w2dfkoximk/master', query)

    return results
}