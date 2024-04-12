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

import db from "../db.server";

export async function loader ( { request } ) {
    await authenticate.admin(request);
  // 
  // let settings = {checked: false};

    let settings = await db.settings.findUnique({
      where:{
        id: 'EnabledCheckout18yoModal'
      }
    });


  return json( { checked: ( settings.value == 'active' ? true : false ) } );

};

export async function action( { request } ){

  let settings = await request.formData();

  // settings = Object.fromEntries( settings.entries() ); Object.fromEntries( settings.entries() );

  settings = Object.fromEntries( settings.entries() );

  // let settings = {name: 'TEST HERE TEST HERE'};
  // settings = {
  //   "checked": settings
  // }
  // console.log(settings)

  await db.settings.upsert({
    where: {
      id: "EnabledCheckout18yoModal",
    },
    update: {
      id: 'EnabledCheckout18yoModal',
      value: ( settings.modalCheckbox ) ? settings.modalCheckbox : 'false'
    },
    create: {
      id: 'EnabledCheckout18yoModal',
      value: ( settings.modalCheckbox ) ? settings.modalCheckbox : 'false'
    }
  });


  return json( settings );

}

export default function AppSettings(){

  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (

    <AppProvider>
      <Form method="POST">
            <Page title="General" primaryAction={<Button submit={true}>Save</Button>}>
              <Card>

                <Checkbox
                  label="Enable NYC AgeCheck Popup"
                  name="modalCheckbox"
                  value="active"
                  checked={formState.checked}
                  onChange={( checked ) => setFormState({ ...formState, checked: checked })}
                />

              </Card>
            </Page>
      </Form>
    </AppProvider>

  );

}