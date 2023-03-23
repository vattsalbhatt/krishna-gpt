import React, { useState, useEffect, useRef } from "react";
import styles from "./Loader.module.css";

function MainScreen() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message == "") return;
    sendMessage(message, "sent");
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data, "data issue");
      setTimeout(() => receiveMessage(data.message, "received"), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const findLocalMessages = JSON.parse(
      localStorage.getItem("bhagvadGitaList")
    ) || [
      {
        message: "What is life?",
        type: "sent",
        time: new Date(),
      },
      {
        message: "Life is a journey of self-discovery. It is a path of learning, understanding, and growth. It is a time to explore our innermost thoughts and feelings, and to discover our true purpose in life. Life is a precious gift, and it is up to us to make the most of it.\n\nLife is a cycle of joy and sorrow, of success and failure",
        type: "received",
        time: new Date(),
      },
      {
        message: "How to impress a girl?",
        type: "sent",
        time: new Date(),
      },
      {
        message: "nMy beloved friend,\n\nImpressing a girl is not an easy task. It requires patience, understanding and a lot of effort. Here are a few tips that may help you in this endeavor:\n\n1. Be yourself: Be confident and honest in your interactions with her. Do not try to be someone you are not.\n\n2. Show respect: Respect her opinions and",
        type: "received",
        time: new Date(),
      },
    ];
    setAllMessages([...findLocalMessages]);
  }, []);

  const receiveMessage = (message, type) => {
    const obj = {
      message: message,
      type: type,
      time: convertDateString(),
    };
    console.log("Message", type, message);
    let currentMessages =
      JSON.parse(localStorage.getItem("bhagvadGitaList")) || [];
    localStorage.setItem(
      "bhagvadGitaList",
      JSON.stringify([...currentMessages, obj])
    );
    currentMessages = JSON.parse(localStorage.getItem("bhagvadGitaList")) || [];
    setAllMessages([...currentMessages]);
    setTyping(false);
    handleClick();
  };

  const sendMessage = (message, type) => {
    setTyping(true);
    const obj = {
      message: message,
      type: type,
      time: convertDateString(),
    };

    console.log("Message", type, message);
    let currentMessages =
      JSON.parse(localStorage.getItem("bhagvadGitaList")) || [];
    localStorage.setItem(
      "bhagvadGitaList",
      JSON.stringify([...currentMessages, obj])
    );
    currentMessages = JSON.parse(localStorage.getItem("bhagvadGitaList")) || [];
    setAllMessages([...currentMessages]);
    setMessage("");
    handleClick();
  };

  const convertDateString = () => {
    const date = new Date();
    const time = date.toLocaleString("en-IN", { hour12: false });
    const timeArr = time.split(",");
    const timeString = `${timeArr[1]}, ${timeArr[0]}`;
    return timeString;
  };

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
    handleClick();
  }, [divHeight]);

  const handleClick = () => {
    const element = document.getElementById("displayAllMessagesDiv");
    setDivHeight(element.scrollHeight);
  };
  return (
    <>
      <div
        className="h-[800px"
        style={{
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#",
        }}
      >
        <div
          className="h-[50px] sticky top-0 text-white shadow-md m-auto flex"
          style={{ backgroundColor: "#00337C" }}
        >
          <div className="ml-2">
            <div className="flex space-x-2 h-[80%] m-auto mt-1">
              <div className="relative w-10 h-10">
                <img
                  className="rounded-full border border-gray-100 shadow-sm"
                  src="https://res.cloudinary.com/dtks0l86r/image/upload/v1674999667/website-static-assets/Project%20Website/lord_i2qjyw.webp"
                  alt="lord-krishna"
                />
                <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="ml-3 pt-1.5 tracking-wider text-[15px]">
              Bhagavad Gita ChatGPT
            </p>
            <p className="ml-3 text-[10px] pb-1 tracking-wide font-light">
              Ask any question to Lord Krishna.
            </p>
          </div>
        </div>
        {/* <div className="mb-4 shadow-md p-2 rounded-b-lg text-center border-red-300">
          <p className="text-[12px] tracking-wide font-medium">
            Ask anything to Lord Krishna?
          </p>
        </div> */}

        <div
          className="overflow-scroll h-[700px]"
          id="displayAllMessagesDiv"
          ref={divRef}
        >
          {allMessages.map((msg, ix) => {
            return (
              <>
                {msg.type == "received" && (
                  <div className="receiver">
                    <div className="flex mb-2 mt-2">
                      <div
                        className="message font-light inline-block p-2 text-white px-3 ml-1 shadow-md rounded-lg rounded-tl-none max-w-[80%]"
                        style={{ backgroundColor: "#0047AB" }}
                      >
                        <p className="text-[12px] ml-1 tracking-wide font-medium">
                          Lord Krishna would say:
                        </p>
                        <p className="ml-1 tracking-wide text-[13px]">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 text-[10px] tracking-wide mt-[-2px] text-gray-500">
                      <p>
                        {msg.time.toLocaleString("en-IN", { hour12: false })}
                      </p>
                    </div>
                  </div>
                )}

                {msg.type == "sent" && (
                  <div className="sender">
                    <div className="flex mb-2 justify-end mt-2">
                      <div
                        className="message font-light inline-block p-2 px-3 mr-1 shadow-md rounded-lg rounded-br-none"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        <p className="ml-1 tracking-wide text-[13px]">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mr-4 text-[10px] tracking-wide mt-[-2px] text-gray-500">
                      <p>
                        {msg.time.toLocaleString("en-IN", { hour12: false })}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          {typing && (
            <div className="receiver">
              <div className="flex mb-2 mt-4">
                <div
                  className="message font-light inline-block p-2 px-3 w-[75px] ml-1 shadow-md rounded-lg rounded-tl-none"
                  style={{ backgroundColor: "#0047AB" }}
                >
                  <div className={styles["typingLoader"]}></div>
                </div>
              </div>
              <div className="ml-4 text-[10px] tracking-wide mt-[-2px] text-gray-500">
                <p>Lord krishna is typing...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="bottom-0 sticky m-auto border-black py-4 bg-white rounded-t-lg shadow-md"
        style={{
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#F5F5F5",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex w-[95%] m-auto">
            <div className="w-[80%]">
              <input
                type="text"
                className="border border-gray-300 w-[100%] h-[40px] rounded-md p-2 tracking-wider"
                placeholder="How to impress a girl?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="w-[20%] m-auto text-center shadow-sm">
              <button
                type="submit"
                className="p-2 px-4 text-sm tracking-wider font-medium rounded-lg"
                style={{ backgroundColor: "#0047AB" }}
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M10.11 13.6501L13.69 10.0601"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MainScreen;
