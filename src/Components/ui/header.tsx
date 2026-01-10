"use client";

import React from "react";
import { Search, Filter, Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
            Welcome Alfred !
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Here is the overview of All Submitted reports
          </p>
        </div>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg self-end sm:self-auto">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search for complaint id"
            className="w-full pl-10 pr-4 py-2.5 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center sm:justify-start">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}





// "use client";

// import React from "react";
// import { Search, Filter, Bell } from "lucide-react";

// export default function Header() {
//   return (
//     <div className="bg-white border-b border-gray-200 px-8 py-6">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-600">Welcome Alfred !</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Here is the overview of All Submitted reports
//           </p>
//         </div>

//         <button className="relative p-2 hover:bg-gray-100 rounded-lg">
//           <Bell className="w-5 h-5 text-gray-600" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
//         </button>
//       </div>

//       {/* Search */}
//       <div className="flex gap-3">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//           <input
//             type="text"
//             placeholder="Search for complaint id"
//             className="w-full pl-10 pr-4 py-2.5 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
//           <Filter className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// }
