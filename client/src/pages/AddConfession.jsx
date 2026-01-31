import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import bg01 from "../assets/bg01.png";
import seal from "../assets/wex-seal.png";

export default function AddConfession() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Regret", emoji: "💔" },
    { name: "Funny", emoji: "😂" },
    { name: "Secret", emoji: "🤫" },
  ];

  const handleOpenModal = () => {
    if (!category) {
      setModalType("category");
      setShowModal(true);
      return;
    }

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
      await api.post("/confession", {
        confession: text,
        category,
      });

      setText("");
      setCategory("");
      setShowModal(false);
      navigate("/", { state: { submitted: true } });
    } catch (err) {
      setModalType("error");
      setShowModal(true);
    }
  };

  return (
    <>
      {/* PAGE */}
      <div className="min-h-screen flex flex-col items-center px-4 py-10">
        <p className="text-[#4A2B0C] text-center mb-8 text-sm">
          Share your feelings anonymously. Your identity stays safe.
        </p>

        <div className="w-full max-w-2xl p-8 rounded-2xl bg-[#4A2B0C]/15 border border-[#C9A86A]/40 shadow-lg text-center">
          <h2
            className="text-3xl font-bold text-[#4A2B0C] mb-3"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Write Your Confession
          </h2>

          <p className="text-[#6B4F30] text-sm mb-4">
            Choose a feeling that matches your confession
          </p>

          {/* CATEGORY CHIPS */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => {
              const active = category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`
    px-4 py-2 rounded-full
    flex items-center gap-2 justify-center
    border transition-all relative overflow-hidden
    ${
      active
      // ? "bg-[#6E1616] text-[#E8D3A8] border-[#6E1616] scale-105 shadow-lg"
      // : "bg-transparent text-[#4A2B0C] border-[#C9A86A]/60 hover:bg-[#C9A86A]/20"
    }
  `}
                >
                  {/* CENTERED SEAL OVERLAY */}
                  {active && (
                    <img
                      src={seal}
                      alt="seal"
                      className="
        absolute inset-0 m-auto
        w-16 h-12 sm:w-18 sm:h-11
        animate-fade-in
        pointer-events-none
      "
                      style={{ zIndex: 20 }}
                    />
                  )}

                  {/* TEXT + EMOJI ABOVE SEAL */}
                  <span className="text-lg relative z-10">{cat.emoji}</span>
                  <span className="text-sm font-medium relative z-10">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TEXTAREA */}
          <textarea
            className="w-full h-44 bg-transparent text-[rgb(58,31,10)] border border-[#C9A86A]/50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#C9A86A] placeholder:text-[#6B4F30]/60"
            placeholder="Write anything... completely anonymous"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* SUBMIT */}
          <button
            onClick={handleOpenModal}
            className="mx-auto mt-6 p-3 bg-[#6E1616] hover:bg-[#5A1212] text-[#E8D3A8] font-semibold rounded-xl transition" 
            style={{ backgroundColor: "#6E1616", color: "#E8D3A8" }}
          >
            Submit Anonymous Confession
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center px-4">
          {/* MODAL CARD WITH BACKGROUND IMAGE */}
          <div
            className="
              w-full max-w-sm  
              p-6 text-center 
              bg-cover bg-center bg-no-repeat
              relative overflow-hidden
            "
            style={{
              backgroundImage: `url(${bg01})`,
            }}
          >
            {/* Soft overlay for readability */}
            {/* <div className="absolute inset-0 bg-[#E8D3A8]/70 backdrop-blur-sm rounded-2xl"></div> */}

            {/* Actual content */}
            <div className="relative z-10">
              {modalType === "category" && (
                <>
                  <h3 className="text-xl font-semibold text-[#4A2B0C]">
                    Pick a Feeling
                  </h3>
                  <p className="text-[#6B4F30] mt-2 text-sm">
                    Select a category that matches your confession.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-5 px-5 py-2 rounded-xl bg-[#6E1616] text-[#E8D3A8]"
                  >
                    Okay
                  </button>
                </>
              )}

              {modalType === "empty" && (
                <>
                  <h3 className="text-xl font-semibold text-[#4A2B0C]">
                    Write Something
                  </h3>
                  <p className="text-[#6B4F30] mt-2 text-sm">
                    You cannot submit an empty confession.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-5 px-5 py-2 rounded-xl bg-[#6E1616] text-[#E8D3A8]"
                  >
                    Okay
                  </button>
                </>
              )}

              {modalType === "confirm" && (
                <>
                  <h3 className="text-xl font-semibold text-[#4A2B0C]">
                    Are you sure?
                  </h3>
                  <p className="text-[#6B4F30] mt-2 text-sm">
                    Submit this confession anonymously?
                  </p>
                  <div className="flex gap-4 justify-center mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-xl bg-[#C9A86A]/50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={send}
                      className="px-4 py-2 rounded-xl bg-[#6E1616] text-[#E8D3A8]"
                    >
                      Yes, Submit
                    </button>
                  </div>
                </>
              )}

              {modalType === "error" && (
                <>
                  <h3 className="text-xl font-semibold text-red-600">Oops!</h3>
                  <p className="text-[#6B4F30] mt-2 text-sm">
                    Something went wrong. Please try again later.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-5 px-5 py-2 rounded-xl bg-red-600 text-white"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
