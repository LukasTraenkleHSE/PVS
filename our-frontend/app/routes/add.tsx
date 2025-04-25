import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import Message from "~/components/message";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

type LoaderData = {
  message: string | null;
};

//loads the message from the url
export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");

    return json({message});

};


//Handles adding an item with the api
export const action: ActionFunction = async ({ request }) => {
    try {
      const formData = await request.formData();
  
      const payload = {
        name: formData.get("name"),
        quantity: Number(formData.get("quantity")),
    };
  
      const response = await fetch(`${apiUrl}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      //redirect to home page with message
      if (response.ok) {
        if (response.status === 200) {
          return redirect(`/?message=Item updated successfully`);
        } else if (response.status === 201) {
          return redirect(`/?message=Item created successfully`);
        } else {
          return redirect(`/?message=Error: Unknown status code ${response.status}`);
        }
        //reload page with error message
      } else {
        if (response.status === 400) {
          return redirect(`?message=Error: Invalid input`);
        } else if (response.status === 500) {
          return redirect(`?message=Error: Server Error`);
        } else {
          return redirect(`?message=Error: Unknown status code ${response.status}`);
        }
      }
    } catch (error) {
      return redirect(`?message=Error: ${error}`);
    }
};


//Displays the add item form
const Add = () => {
  const { message } = useLoaderData<LoaderData>();

    return (
        <div>
            {message && <Message text={message} visible={true} />}
            <div className="title">Add New Item</div>
            <div className="form">
                <form method="post">
                    <label htmlFor="name">Item Name</label>
                    <input type="text" name="name" placeholder="Item Name" required />
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" placeholder="Quantity" min="1" required />
                    <div className="buttons">
                        <button type="submit" className="green">Add Item</button>
                        <Link to="/">
                            <button className="blue">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;