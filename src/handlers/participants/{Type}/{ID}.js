'use strict';

const Boom = require('boom');
const _participant=require("../../../models/participants")
const Joi=require('joi');
require('dotenv').config();

const _typeRegex=new RegExp(process.env.IdentifierTypeValue,'i');
const _idRegex=new RegExp(process.env.IdentifierRegex,'i');


const identifierSchema=Joi.object().keys({
    Type:Joi.string().regex(_typeRegex).length(4).required(),
    ID:Joi.string().regex(_idRegex).length(14).required()
});


/**
 * Operations on /participants/{Type}/{ID}
 */
module.exports = {
    /**
     * summary: Look up participant information
     * description: The HTTP request GET /participants/{Type}/{ID} is used to find out in which FSP the requested Party, defined by {Type} and {ID} is located (for example, GET /participants/MSISDN/123456789). This HTTP request should support a query string to filter FSP information regarding a specific currency only (This similarly applies to the SubId). To query a specific currency only, the HTTP request GET /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    get: async function ParticipantsByTypeAndIDGet(request, h) {
        var _type=request.params.Type;
        var _identifier=request.params.ID;

        var response=null;

        const _result=Joi.validate({Type:_type,ID:_identifier},identifierSchema);
        if(_result.error===null){
            var accountNumber=_result.value.ID;
            var bankCode=accountNumber.substring(0,3);
            let participant=await _participant.getParticipant(bankCode);
            //Response
            response={"partyList":participant};
        }else{
            response=_result.error.message;
        } 
        return h.response(response);
    },
    /**
     * summary: Return participant information
     * description: The PUT /participants/{Type}/{ID} is used to update information in the server regarding the provided identity, defined by {Type} and {ID} (for example, PUT /participants/MSISDN/123456789).
     * parameters: Type, ID, content-type, date, fspiop-source, body, accept, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
     */
    put: function ParticipantsByTypeAndIDPut(request, h) {
        return Boom.notImplemented();
    },
    /**
     * summary: Create participant information
     * description: The HTTP request POST /participants/{Type}/{ID} is used to create information in the server regarding the provided identity, defined by {Type} and {ID} (for example, POST /participants/MSISDN/123456789).
     * parameters: accept, Type, ID, content-type, date, fspiop-source, body, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
     * produces: application/json
     * responses: 201, 400, 401, 403, 404, 405, 406, 501, 503
     */
    post: function ParticipantsByTypeAndIDPost(request, h) {
        return Boom.notImplemented();
    },
    /**
     * summary: Delete participant information
     * description: The HTTP request DELETE /participants/{Type}/{ID} is used to delete information in the server regarding the provided identity, defined by {Type} and {ID}) (for example, DELETE /participants/MSISDN/123456789). This HTTP request should support a query string to delete FSP information regarding a specific currency only (This similarly applies to the SubId). To delete a specific currency only, the HTTP request DELETE /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
     * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
     * produces: application/json
     * responses: 204, 400, 401, 403, 404, 405, 406, 501, 503
     */
    delete: function ParticipantsByTypeAndIDDelete(request, h) {
        return Boom.notImplemented();
    }
};
