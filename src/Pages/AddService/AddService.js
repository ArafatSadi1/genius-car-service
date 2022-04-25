import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
      const url = 'http://localhost:5000/service';
      fetch(url, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result =>{
        console.log(result)
      })
    };
  return (
    <div className="w-50 mx-auto">
      <h2>Add your service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-2"  placeholder="Name" {...register("name")} />
        <textarea className="mb-2"  placeholder="Description" {...register("description")} />
        <input className="mb-2"  placeholder="Price" type="number" {...register("price")} />
        <input className="mb-2"  placeholder="Image" type="text" {...register("img")} />
        <input className="mb-2" type="submit" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
