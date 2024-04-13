import React, { useState, useCallback } from 'react';

import {
  Page,
  Card,
  Button,
  AppProvider,
  Checkbox
} from '@shopify/polaris';

import { useLoaderData, useActionData, Form } from '@remix-run/react';
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

// import db from "../db.server";

export async function loader ( { request } ) {

  await authenticate.admin(request);

  // let settings = await db.settings.findUnique({
  //   where:{
  //     id: 'EnabledCheckout18yoModal'
  //   }
  // });

  return json( 
    { 
      apiKey: process.env.SHOPIFY_API_KEY || "", 
      checked: ( settings.value == 'active' ? true : false ) 
    } 
  );

};

export async function action( { request } ){

  let settings = await request.formData();

  settings = Object.fromEntries( settings.entries() );

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
