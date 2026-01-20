import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AddConfession() {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "empty" OR "confirm" OR "error"
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (!text.trim()) {
      setModalType("empty");
      setShowModal(true);
      return;
    }

    setModalType("confirm");
    setShowModal(true);
  };

  const send = async () => {
    try {
      await api.post("/confession", { confession: text });
      setText("");
      setShowModal(false);
      navigate("/", { state: { submitted: true } });
    } catch (err) {
      setModalType("error");
      setShowModal(true);
    }
  };

  return (
    <>
      {/* PAGE WRAPPER */}
      <div
        className="
          min-h-screen
          flex flex-col items-center
          px-4 sm:px-6 lg:px-10
          py-10 sm:py-14
        "
      >
        <p className="text-blue-200 text-center mb-8 sm:mb-10 text-xs sm:text-sm md:text-base" >
          Share your feelings anonymously. No one will know it's you.
        </p>

        {/* GLASS CARD */}
        <div
          className="
            w-full max-w-lg sm:max-w-2xl
            bg-white/20 backdrop-blur-xl
            border border-white/30
            shadow-2xl rounded-3xl
            p-5 sm:p-8 lg:p-10
          "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-pink-700 mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Write Your Confession
          </h2>

          <p className="text-gray-700 text-sm md:text-base mb-4" >
            Write what’s in your heart…
          </p>

          {/* TEXTAREA */}
          <textarea
            className="
              w-full h-36 sm:h-44 md:h-52
              bg-transparent backdrop-blur-lg
              text-pink-900
              rounded-2xl border border-white/40
              p-3 sm:p-4 md:p-5
              outline-none
              focus:ring-2 focus:ring-pink-400
              text-sm sm:text-base md:text-lg
              placeholder:text-pink-600/60
            "
            placeholder="Write anything... completely anonymous"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleOpenModal}
            className="
              w-full mt-5 sm:mt-6
              py-3 rounded-2xl
              bg-gradient-to-r from-pink-500 to-pink-600
              hover:from-pink-600 hover:to-pink-700
              text-white shadow-lg
              text-sm sm:text-base md:text-lg
              font-semibold active:scale-95
              transition
            "
          >
            Submit Anonymous Confession
          </button>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center px-4">
          <div
            className="
              w-full max-w-sm
              bg-blue-300
              border border-pink-300/40
              shadow-xl shadow-pink-300/30
              rounded-2xl
              p-6
              text-center
            "
          >
            {/* EMPTY TEXT MODAL */}
            {modalType === "empty" && (
              <>
                <h3 className="text-xl font-semibold text-pink-700">
                  Write Something
                </h3>
                <p className="text-gray-700 mt-2 text-sm">
                  You cannot submit an empty confession.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="
                    mt-5 px-5 py-2 rounded-xl
                    bg-pink-600 hover:bg-pink-700
                    text-white transition
                  "
                >
                  Okay
                </button>
              </>
            )}

            {/* CONFIRM SUBMISSION MODAL */}
            {modalType === "confirm" && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-pink-700">
                  Are you sure?
                </h3>

                <p className="text-gray-700 mt-2 text-sm">
                  Do you want to submit your confession anonymously?
                </p>

                <div className="flex gap-4 justify-center mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="
                      px-4 py-2 rounded-xl
                      bg-white/30 text-gray-800
                      hover:bg-white/40 transition
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={send}
                    className="
                      px-4 py-2 rounded-xl
                      bg-pink-600 hover:bg-pink-700
                      text-white transition
                    "
                  >
                    Yes, Submit
                  </button>
                </div>
              </>
            )}

            {/* ERROR MODAL */}
            {modalType === "error" && (
              <>
                <h3 className="text-xl font-semibold text-red-500">
                  Oops!
                </h3>
                <p className="text-gray-700 mt-2 text-sm">
                  Something went wrong. Please try again later.
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="
                    mt-5 px-5 py-2 rounded-xl
                    bg-red-600 hover:bg-red-700
                    text-white transition
                  "
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
