export default {
    Mutation: {
        setLoggedIn: async (_, { val }, {cache}) => {
            cache.writeData({
                data: {
                    isLoggedIn: val
                }
            })
        }
    }
}