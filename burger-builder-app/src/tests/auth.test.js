import reducer from "../store/reducers/authReducer"
import * as actionTypes from "../store/actions/actionsTypes"

describe('', function () {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: "/"
        })
    })
});