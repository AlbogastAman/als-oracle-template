'use strict';
var Mockgen = require('./mockgen.js');
const conn=require("../../config/knexfile").development;
const knex = require('knex')(conn);
/**
 * Operations on /participants
 */

exports.getParticipant = async (bankCode)=>{
       var participant=null;
       await knex.select('p.participantName as fspId','c.name as currency', knex.raw('? as ??', ['null', 'partySubIdOrType'])).from('currencyParticipant as cp').innerJoin('participant as p', 'cp.participantId', 'p.participantId')
            .innerJoin('currency as c', 'c.currencyId', 'cp.currencyId').where({
                'p.participantName':bankCode,
                'p.isActive': 1
            }).then((fsp)=>{
                participant=fsp;
            }).catch((err)=>{
                console.log(err); throw err;
            }).finally()

        return participant;
 }

