"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const { isLoaded, user } = useUser();
  const [inputValues, setInputValues] = useState({
    image: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  async function submitForm(e) {
    e.preventDefault();

    if (inputValues.image.length > 0) {
      await user.setProfileImage({ file: inputValues.image });
    }

    if (inputValues.username.length > 0) {
      await user.update({ username: inputValues.username });
    }

    if (inputValues.email.length > 0) {
      await user
        .createEmailAddress({ email: inputValues.email })
        .then((res) => {
          res
            .prepareVerification({ strategy: "email_code" })
            .then(async () => {
              const code = prompt(
                "Enter Verification Code \n (Note: A code has been sent to your E-mail)"
              );
              await res
                .attemptVerification({ code })
                .then(() => {
                  console.log("Email Verified");
                  user.update({ primaryEmailAddressId: res.id });
                  user.emailAddresses.forEach((email) => {
                    if (email.id != res.id) email.destroy();
                  });
                })
                .catch(() => res.destroy());
            })
            .catch(() => res.destroy());
        });
    }

    if (
      inputValues.currentPassword.length > 0 &&
      inputValues.newPassword.length > 0 &&
      inputValues.confirmNewPassword.length > 0
    ) {
      if (inputValues.newPassword === inputValues.confirmNewPassword) {
        await user
          .updatePassword({
            currentPassword: inputValues.currentPassword,
            newPassword: inputValues.newPassword,
          })
          .then(() => console.log("Password Updated"))
          .catch((error) => console.log(error));
        // .catch(() => console.error("Password Not Updated"));
      }
    }

    await user.reload();
  }

  function clearImage() {
    document.getElementById("image").value = "";
    setInputValues({
      image: "",
    });
  }

  function convertToBase64AndSetImage(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () =>
      setInputValues({
        ...inputValues,
        image: reader.result,
      });
  }

  function setImageOnDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    convertToBase64AndSetImage(file);
  }

  async function handleInput(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      convertToBase64AndSetImage(files[0]);
    } else {
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  }

  if (!isLoaded) return;

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="m-auto">
        <h1 className="text-white text-3xl fw-bold mb-4">Update Profile</h1>
        <form className="flex flex-col" onSubmit={submitForm}>
          {inputValues.image.length == 0 && (
            <div
              className="bg-gray-800 text-white flex justify-center items-center border-dashed border-1 border-white w-full min-h-[100px] rounded mb-3"
              onDrop={setImageOnDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              Drop Image
            </div>
          )}

          {inputValues.image.length > 0 && (
            <div className="relative">
              <button
                className="btn bg-red-500 hover:bg-red-400 text-white absolute top-0 right-0"
                onClick={clearImage}
              >
                Delete
              </button>
              <label htmlFor="image" className="mb-3">
                <Image
                  className={"rounded-full w-[150px] h-[150px]"}
                  src={inputValues.image}
                  alt=""
                  width={100}
                  height={100}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  hidden
                  onChange={handleInput}
                />
              </label>
            </div>
          )}

          {/* <div className="relative">
            {inputValues.image.length > 0 && (
              <button
                className="btn bg-red-500 hover:bg-red-400 text-white absolute top-0 right-0"
                onClick={clearImage}
              >
                Delete
              </button>
            )}
            <label htmlFor="image" className="mb-3 ">
              <Image
                className={"rounded-full w-[150px] h-[150px]"}
                src={inputValues.image || user.imageUrl}
                alt=""
                width={100}
                height={100}
              />
              <input
                type="file"
                id="image"
                name="image"
                hidden
                onChange={handleInput}
              />
            </label>
          </div> */}
          <div className="mb-3">
            <label className="block font-medium text-white mb-1">
              Username
            </label>
            <input
              type="text"
              className="block min-w-0 w-full grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-white border-none rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300"
              name="username"
              placeholder={user?.username || "Enter Username"}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-white mb-1">E-mail</label>
            <input
              type="email"
              className="block min-w-0 w-full grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-white border-none rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300"
              name="email"
              placeholder={user?.primaryEmailAddress || "Enter E-mail"}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="mb-3">
              <label className="block font-medium text-white mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="block min-w-0 w-full grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-white border-none rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300"
                name="currentPassword"
                placeholder="Enter Current Password"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium text-white mb-1">
                New Password
              </label>
              <input
                type="password"
                className="block min-w-0 w-full grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-white border-none rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300"
                name="newPassword"
                placeholder="Enter New Password"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium text-white mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="block min-w-0 w-full grow py-1.5 text-base text-gray-900 placeholder:text-gray-400 bg-white border-none rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300"
                name="confirmNewPassword"
                placeholder="Enter Confirm New Password"
                onChange={handleInput}
              />
            </div>
          </div>

          <button className="btn btn-primary ms-auto">Update</button>
        </form>
      </div>
    </div>
  );
}
