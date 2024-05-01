import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-4 text-2xl font-bold">{label}</label>
      )}

      <Controller
        name={name || "Content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            initialValue={defaultValue}
            init={{
              branding: false,
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks  | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

function MyForm({ post, blog = null, id = "" }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    content: post?.content || "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', data.content);
      if (file) formData.append('coverImageUrl', file);

      const response = await axios.post(
        "http://localhost:4000/api/v1/blog/add",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      toast.success("Blog added successfully");
      navigate("/blogs");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
    }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="coverImageUrl"
          className="block text-2xl font-bold mb-2"
        >
          Cover Image:
        </label>
        {blog && (
          <img
            src={blog.profileImageUrl}
            alt="profileImage"
            className="w-[150px] my-5 border border-black"
          />
        )}
        <input
          type="file"
          name="coverImageUrl"
          id="coverImageUrl"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
          required={id ? false : true}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-2xl font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <RTE name="content" control={control} label="Content" />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg my-4">
        Submit
      </button>
    </form>
  );
}

export default MyForm;
