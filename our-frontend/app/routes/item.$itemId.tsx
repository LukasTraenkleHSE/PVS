import { useParams, Link, useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";

import Message from "~/components/message";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;


type Item = {
  id: number;
  name: string;
  quantity: number;
};

type LoaderData = {
  item: Item;
  message: string | null;
};


//loads the item from the api and displays it in the form
export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");
    if(message && message.includes("Error")) {
        return json({item: null, message });
    }

    try {
        const { itemId } = params;
        const response = await fetch(`${apiUrl}/items/${itemId}`);
        if (!response.ok) {
          let errorText = "";
          if (response.status === 404) {
            errorText = "Item not found";
        } else if (response.status === 500) {
              errorText = "Server Error";
          } else {
              errorText = "Unknown status code"; 
          }
          return json({ items: null, message: "Error: " + errorText });
        }
        const item: Item[] = await response.json();
        return json({item, message});
      } catch (error: any) {
        return json({ items: null, message: "Error: " + error.message });
      }
};

//Handles updating an item with the api
export const action: ActionFunction = async ({ request, params }) => {
    try {
      const formData = await request.formData();
  
      const payload = {
        name: formData.get("name"),
        quantity: Number(formData.get("quantity")),
      };
  
      const { itemId } = params;
      const response = await fetch(`${apiUrl}/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      //redirect to home page with message
      if (response.ok) {
        if (response.status === 200) {
          return redirect(`/?message=Item updated successfully`);
        } else {
          return redirect(`/?message=Error: Unknown status code ${response.status}`);
        }
      //reload page with error message
      } else {
        if (response.status === 400) {
          return redirect(`?message=Error: Invalid input`);
        } else if (response.status === 404) {
          return redirect(`?message=Error: Item not found`);
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

//Displays the edit item form
const Edit = () => {
  const { item, message } = useLoaderData<LoaderData>();
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

    return (
        <div>
            {message && <Message text={message} visible={true} />}
            <div className="title">Edit Item</div>
            <div className="form">
                <form method="post">
                    <label htmlFor="name">Item Name</label>
                    <input type="text" name="name" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value)) } min="1" required />
                    <div className="buttons">
                        <button type="submit" className="green">Update Item</button>
                        <Link to="/">
                            <button className="blue">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;