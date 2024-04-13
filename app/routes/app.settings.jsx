import React, { useState, useCallback } from 'react';



import {
  Page,
  Card,
  Button,
  AppProvider,
  Checkbox
} from '@shopify/polaris';

import { boundary } from "@shopify/shopify-app-remix/server";
import { useLoaderData, useRouteError, useActionData, Form } from '@remix-run/react';
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

import db from "../db.server";

export async function loader ( { request } ) {

  await authenticate.admin(request);

  let settings = { 
    apiKey: process.env.SHOPIFY_API_KEY || "", 
    checked: false
  }

  // let dbFindUnique = await db.settings.findUnique({
  //   where:{
  //     id: 'EnabledCheckout18yoModal'
  //   }
  // });
  
  // if( typeof dbFindUnique != 'undefined' && typeof dbFindUnique.value != 'undefined' ){
  //   if ( dbFindUnique.value == "active" ){
  //     settings.checked = true;
  //   }
  // }

  return json( settings );

};

export async function action( { request } ){

  let settings = await request.formData();

  settings = Object.fromEntries( settings.entries() );

  console.lop('> action = settings: ', settings);

  // await db.settings.upsert({
  //   where: {
  //     id: "EnabledCheckout18yoModal",
  //   },
  //   update: {
  //     id: 'EnabledCheckout18yoModal',
  //     value: ( settings.modalCheckbox ) ? settings.modalCheckbox : 'false'
  //   },
  //   create: {
  //     id: 'EnabledCheckout18yoModal',
  //     value: ( settings.modalCheckbox ) ? settings.modalCheckbox : 'false'
  //   }
  // });

  return json( settings );

}

export default function AppSettings(){

  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (

    <Page  backAction={{content: 'Home', url: '/'}} title="Settings" primaryAction={<Button submit={true}>Save</Button>}>
    

      <AppProvider isEmbeddedApp apiKey={ formState.apiKey }>
        <Form method="POST">
          <Card>

            <Checkbox
              label="Enable NYC AgeCheck Popup"
              name="modalCheckbox"
              value="active"
              checked={formState.checked}
              onChange={( checked ) => setFormState({ ...formState, checked: checked })}
            />

          </Card>
        </Form>
      </AppProvider>
      


    </Page>
  );

}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
