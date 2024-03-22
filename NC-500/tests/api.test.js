const {getAllLocations, getSingleLocation} = require('../utils/supabase-api-calls')

describe('getAllLocations', ()=>{
    test('returns something', ()=>{
        getAllLocations().then((response)=>{
            const result = response
          
             expect(result).not.toEqual(null)
        })
       

        
    })
})

describe('getAllLocations', ()=>{
    test('returns correct location when given an id', ()=>{
        getSingleLocation(1).then((response)=>{
            const result = response
            expect(result.id).toBe(1)
        })
     })
})