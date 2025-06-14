// src/pages/ListingPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sampleListings } from "../data/sampleListings";

const ITEMS_PER_PAGE = 4;

const ListingPage = () => {
  const { neighborhood } = useParams();
  const items = sampleListings[neighborhood] || [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Link
        to="/results"
        className="inline-flex items-center text-[#00AEEF] hover:text-[#008bb5] font-medium mb-6"
      >
        <span className="mr-2 text-2xl">←</span>
        <span className="text-lg">돌아가기</span>
      </Link>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📌 {neighborhood} 지역 매물
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">
          죄송해요, 현재{" "}
          <strong className="text-gray-800">{neighborhood}</strong> 지역의 매물
          정보를 찾을 수 없습니다.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentItems.map((item, idx) => (
              <div
                key={startIdx + idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-200 flex flex-col md:flex-row"
              >
                <div className="h-48 md:h-auto md:w-48 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 flex-1 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <ul className="flex flex-wrap gap-6 text-gray-700 text-sm mb-4">
                    <li className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                      <span>치안 점수: {item.safetyScore}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                      <span>교통 거리: {item.transportScore}</span>
                    </li>
                  </ul>
                  <Link
                    to={`/list/${encodeURIComponent(neighborhood)}/${
                      startIdx + idx
                    }`}
                    className="mt-auto inline-block self-start px-4 py-2 bg-[#00AEEF] text-white rounded-lg text-sm font-medium hover:bg-[#008bb5] transition-colors"
                  >
                    상세보기
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#00AEEF] text-white hover:bg-[#008bb5]"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-[#00AEEF] text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#00AEEF] text-white hover:bg-[#008bb5]"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListingPage;
