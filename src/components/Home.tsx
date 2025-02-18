"use client";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { Navbar } from "./tools/Navbar";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="">
      <Navbar />
      <UploadDropzone
        appearance={{
          container: {
            border: "1px solid red",
          },
          uploadIcon: {
            color: "orange",
          },
          button: {
            background: "red",
          },
          label: {
            color: "red",
          },
        }}
        className="mt-72 max-sm:mt-60 mx-auto w-[70vh] "
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          axios
            .post("/api/pdf", {
              name: "yo",
              url: res[0].url,
              userId: user?.publicMetadata.userId,
            })
            .then((response) => {
              console.log(response);
              if (response.data.msg) {
                alert("Unable to parse the PDF");
              } else {
                alert("PDF uploaded successfully");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
