import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect, useLoaderData, useNavigate } from "@remix-run/react";

import Message from "~/components/message";

const apiUrl = process.env.VITE_API_SERVER_URL;

//schema for item
type Item = {
    id: number;
    name: string;
    quantity: number;
};

type LoaderData = {
    items: Item[];
    message: string | null;
  };

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const message = url.searchParams.get("message");

    //gets all items from the api
    //if error, display error message
    try {
        const response = await fetch(`${apiUrl}/items`);
        if (!response.ok) {
            const data: Item[] = [];
            let errorText = "";
            if (response.status === 500) {
                errorText = "Server Error";
                console.error("Server Error: ", response.statusText);
            } else {
                errorText =  "Unknown status code";
                console.error("Unknown status code: ", response.statusText); 
            }
            return json({ items: data, message: "Error: " + errorText });
        }
        const data: Item[] = await response.json();
        console.log("Data: ", data);
        return json({ items: data, message });
      } catch (error: any) {
        const data: Item[] = [];
        console.error("Error: ", error);
        return json({ items: data, message: "Error: " + error.message });
      }
};

//Handles deleting an item with the api
//if error, redirect to home page with error message
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");
  
    try{
        const response = await fetch(`${apiUrl}/items/${itemId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            if (response.status === 404) {
                console.error("Item not found: ", response.statusText);
                return redirect(`/?message=Error: Item not found`);
            } else if (response.status === 500) {
                console.error("Server Error: ", response.statusText);
                return redirect(`/?message=Error: Server Error`);
            } else {
                console.error("Unknown status code: ", response.statusText);
                return redirect(`?message=Error: Unknown status code ${response.status}`);
            }
        }
        if (response.status === 204) {
            console.log("Item deleted successfully: ", response.statusText);
            return redirect(`/?message=Item deleted successfully`);
        } else {
            console.error("Unknown status code: ", response.statusText);
            return redirect(`?message=Error: Unknown status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error: ", error);
        return redirect(`?message=Error: ${error}`);
    }
};


//Displays the home page with a list of items
const Home = () => {    
    const navigate = useNavigate();
    const { items, message } = useLoaderData<LoaderData>();
    const handleEdit = (id: number) => {
        navigate(`/item/${id}`);
    };

    console.log(message);

    //Opens confirmation dialog for deleting an item
    //if confirmed, submits the form to delete the item
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, itemId: number) => {
        event.preventDefault();
        const isConfirmed = confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            const form = document.getElementById(`delete-form-${itemId}`) as HTMLFormElement;
            if (form) {
                form.submit();
            }
        } 
    }
    

    return (
        <div>
            {message && <Message text={message} visible={true} />}
            <div className="title">My Items</div>
            {items.length >= 1 && (
                <div className="itemList">
                    <div className="listHeader item">
                        <div className="id">
                            ID
                        </div>
                        <div className="name">
                            Name
                        </div>
                        <div className="quantity">
                            Quantity
                        </div>
                        <div className="actions">
                            Actions
                        </div>
                    </div>
                    {items.map((item) => (
                        <div key={item.id} className="item">
                            <div className="id">{item.id}</div>
                            <div className="name">{item.name}</div>
                            <div className="quantity">{item.quantity}</div>
                            <button className="blue" onClick={() => handleEdit(item.id)}>Edit</button>
                            <form id={`delete-form-${item.id}`} method="post" action="/?index">
                                <input type="hidden" name="itemId" value={item.id} />
                                <button className="red" onClick={(event) => handleDelete(event, item.id)}>Delete</button>
                            </form>
                        </div>
                    ))}
                </div>
            )}
           
            {items.length === 0 && (
                <div>
                    No Items found. Click "Add Item" to create your first item.
                </div>
            )}
        </div>
    );
};

export default Home;