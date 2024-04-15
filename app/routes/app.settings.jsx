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

import { PrismaClient } from '@prisma/client';

export async function loader ( { request } ) {


  const prisma = new PrismaClient();

  const isModalEnabled = await prisma.settings.findUnique({
    where:{
      id: 'EnabledCheckout18yoModal'
    }
  });

  let settings = { 
    apiKey: process.env.SHOPIFY_API_KEY || "", 
    checked: false,
  }

  if( isModalEnabled ){
    settings.checked = ( isModalEnabled.value == 'active' ) ? true : false
  }

  console.log('> settings: ', settings, isModalEnabled);

  return json( settings );

};

export async function action( { request } ){

  const prisma = new PrismaClient();

  let settings = await request.formData();

  settings = Object.fromEntries( settings.entries() );

  console.log('> action = settings: ', settings);

  await prisma.settings.upsert({
    where: {
      id: "EnabledCheckout18yoModal",
    },
    update: {
      id: 'EnabledCheckout18yoModal',
      value: settings.modalCheckbox
    },
    create: {
      id: 'EnabledCheckout18yoModal',
      value: settings.modalCheckbox
    }
  });

  return json( settings );

}

export default function AppSettings(){

  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  console.log('> settings count: ', settings.count);
  // console.log('> settings  : ', settings.count);

  return (

    <Page  backAction={{content: 'Home', url: '/'}} title="Settings">
    

      <AppProvider isEmbeddedApp apiKey={ formState.apiKey }>
        <Form method="POST">
          <Card>

              <p>
                <Checkbox
                  label="Enable NYC AgeCheck Popup"
                  name="modalCheckbox"
                  value="active"
                  checked={formState.checked}
                  onChange={( checked ) => setFormState({ ...formState, checked: checked })}
                />
              </p>

              <p style={ {'margin-top': '10px'} }>
                <Button submit={true}>Submit</Button>
              </p>

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
