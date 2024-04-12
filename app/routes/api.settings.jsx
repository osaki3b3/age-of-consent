import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';

import db from "../db.server";


export async function loader( { request } ){

    let settings = await db.settings.findUnique({
        where:{
            id: 'EnabledCheckout18yoModal'
        }
    });

    return json( { checked: ( settings.value == 'active' ? true : false ) } );

}

export async function action( { request  } ){
    
    const method = request.method;
    // let settings = await db.settings.findUnique({
    //     where:{
    //         id: 'EnabledCheckout18yoModal'
    //     }
    // });
  

    switch( method ){

        // case "POST":
        //     return json( { checked: ( settings.value == 'active' ? true : false ) } );

        default:
            return new Response("Method now allowed.", {status: 302});

    }
}