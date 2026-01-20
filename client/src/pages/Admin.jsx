import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import api from "../api/api";

export default function Admin() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/confession").then((res) => setData(res.data));
  }, []);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const deleteConfession = async () => {
    try {
      await api.delete(`/confession/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setData(data.filter((c) => c._id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen text-white">
      {/* ADMIN HEADER */}
      <h1
        className="
          text-3xl sm:text-4xl lg:text-5xl
          font-extrabold text-center 
          text-pink-600 mb-2
        "
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Admin Panel
      </h1>

      <h2
        className="
          text-center text-transparent 
          bg-clip-text bg-gradient-to-r 
          from-indigo-500 to-pink-500
          text-sm sm:text-base mb-3
        "
      >
        Manage All Confessions
      </h2>

      {/* TOTAL COUNT */}
      <p className="text-center text-indigo-600 text-sm sm:text-base mb-8">
        Total Confessions:{" "}
        <span className="font-semibold 
      bg-gradient-to-r from-pink-500 to-indigo-500
      text-transparent bg-clip-text
      ">{data.length}</span>
      </p>

      {/* CONFESSION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((confession) => (
          <div
            key={confession._id}
            className="
              bg-white/10 backdrop-blur-xl 
              border border-white/20
              rounded-2xl p-5 shadow-xl relative
            "
          >
            <p className="text-gray-900 text-base whitespace-pre-wrap">
              {confession.confession}
            </p>

            <p className="text-xs text-right text-gray-700 mt-3">
              {new Date(confession.createdAt).toLocaleString()}
            </p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => openModal(confession._id)}
              className="
                absolute top-3 right-3
                bg-gradient-to-r from-pink-500 to-indigo-500
                p-2 rounded-full text-white shadow-lg
                hover:scale-110 active:scale-95 transition
              "
              title="Delete"
            >
              <FiTrash2 className="text-sm sm:text-base" />
            </button>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No confessions found…
        </p>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center px-4">
          <div
            className="
              w-full max-w-sm
              rounded-2xl p-6 shadow-2xl text-center
              bg-[rgba(173,216,230,0.25)] 
              backdrop-blur-xl border border-white/30
            "
            style={{
              backgroundColor: "rgb(25, 105, 170)",
            }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
              Delete Confession?
            </h3>

            <p className="text-blue-800/80 mt-2 text-sm">
              Are you sure you want to delete this confession?
            </p>

            <div className="flex gap-4 justify-center mt-6">
              {/* Cancel */}
              <button
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2 rounded-xl
                  bg-white/40 text-blue-900 font-medium
                  hover:bg-white/50 transition
                "
              >
                Cancel
              </button>

              {/* Delete */}
              <button
                onClick={deleteConfession}
                className="
                  px-4 py-2 rounded-xl 
                  bg-red-500 text-white font-semibold
                  hover:bg-red-600 transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
