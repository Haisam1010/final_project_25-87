import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import { securityMiddleware } from "./securityMiddleware";

const PostCard = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTopic, setUpdatedTopic] = useState(post.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    post.description
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedTopic(post.title);
    setUpdatedDescription(post.description);
  };

  const handleSaveEdit = async () => {
    const response = await onEdit(post, updatedTopic, updatedDescription);
    if (response === true) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    onDelete(post);
  };

  return (
    <div className="mb-4 bg-white p-4 shadow rounded">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTopic}
            onChange={(e) => setUpdatedTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Topic"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Description"
            rows={4}
          />
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h6 className="text-lg font-semibold text-blue-800">{post.title}</h6>
          <p className="text-gray-800">{post.description}</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleEdit}
              className="bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 1.5h.008v.008a2.5 2.5 0 01-1.5 4.95l-11.314 11.314a2 2 0 01-1.414.586H5a2 2 0 01-2-2v-3.086a2 2 0 01.586-1.414l11.314-11.314z"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PostForm = ({ onAddPost }) => {
  const formik = useFormik({
    initialValues: {
      topic: "",
      description: "",
    },
    validationSchema: Yup.object({
      topic: Yup.string().required("Topic is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const response = await onAddPost(values);
      if (response === true) {
        resetForm();
      }
    },
  });

  return (
    <div className="flex justify-center mb-8">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
        <input
          className="w-full p-2 border border-gray-300 rounded mt-2"
          {...formik.getFieldProps("topic")}
          placeholder="Topic"
        />
        {formik.touched.topic && formik.errors.topic && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.topic}</p>
        )}
        <textarea
          className="w-full p-2 border border-gray-300 rounded mt-2"
          {...formik.getFieldProps("description")}
          placeholder="Description"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.description}
          </p>
        )}
        <button
          type="submit"
          className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const isAuthUser = securityMiddleware();
    if (!isAuthUser) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = window.localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:3001/api/posts/all",
          config
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const handleRefreshPosts = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:3001/api/posts/all",
        config
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error refreshing posts:", error);
    }
  };
  async function detectHateSpeech(text) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/detect-hate-speech",
        { text }
      );
      console.log(response.data.result);
      return response;
    } catch (error) {
      console.error("Error detecting hate speech:", error);
      throw error;
    }
  }

  const handleOnAddPost = async (values) => {
    try {
      const response1 = await detectHateSpeech(values.topic);
      const response2 = await detectHateSpeech(values.description);
      if (
        response1.data.result === "Hate speech and abusive" ||
        response2.data.result === "Hate speech and abusive"
      ) {
        setNotify({
          isOpen: true,
          message: "Hate speech and abusive",
          type: "error",
        });
      } else {
        try {
          const token = window.localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.post(
            "http://localhost:3001/api/posts/create",
            {
              title: values.topic,
              description: values.description,
            },
            config
          );

          handleRefreshPosts();
          handleNotification(response);
          return true;
        } catch (error) {
          console.error("Error creating post:", error);
          handleNotification(error.response);
          return false;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnEditPost = async (post, updatedTopic, updatedDescription) => {
    try {
      const response1 = await detectHateSpeech(updatedTopic);
      const response2 = await detectHateSpeech(updatedDescription);
      if (
        response1.data.result === "Hate speech and abusive" ||
        response2.data.result === "Hate speech and abusive"
      ) {
        setNotify({
          isOpen: true,
          message: "Hate speech and abusive",
          type: "error",
        });
      } else {
        try {
          const token = window.localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.put(
            `http://localhost:3001/api/posts/${post._id.$oid}`,
            {
              title: updatedTopic,
              description: updatedDescription,
            },
            config
          );
          handleRefreshPosts();
          handleNotification(response);
          return true;
        } catch (error) {
          console.error("Error updating post:", error);
          handleNotification(error.response);
          return false;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNotification = (response) => {
    let type = "";
    if (response.status === 200) {
      type = "success";
    } else if (response.status >= 400 && response.status < 500) {
      type = "error";
    } else {
      type = "info";
    }
    setNotify({
      isOpen: true,
      message: response.data.message || "An unexpected error occurred",
      type: type,
    });
  };

  const handleOnDeletePost = async (post) => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:3001/api/posts/${post._id.$oid}`,
        config
      );
      handleRefreshPosts();
      handleNotification(response);
    } catch (error) {
      console.error("Error deleting post:", error);
      handleNotification(error.response);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="pt-8">
        <h4 className="text-2xl font-semibold text-blue-800 mb-4">My Posts</h4>
        <Notification notify={notify} setNotify={setNotify} />
        <PostForm onAddPost={handleOnAddPost} />
        {Array.isArray(posts) &&
          posts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              onEdit={handleOnEditPost}
              onDelete={handleOnDeletePost}
            />
          ))}
      </div>
    </div>
  );
};

export default Post;
