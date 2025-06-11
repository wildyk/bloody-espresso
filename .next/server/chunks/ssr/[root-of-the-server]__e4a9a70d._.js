module.exports = {

"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}}),
"[project]/src/app/lib/data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addToCart": (()=>addToCart),
    "createTransaksi": (()=>createTransaksi),
    "fetchAllProduk": (()=>fetchAllProduk),
    "fetchAnalytics": (()=>fetchAnalytics),
    "fetchCartItems": (()=>fetchCartItems),
    "fetchPenjualanProduk": (()=>fetchPenjualanProduk),
    "fetchProduk": (()=>fetchProduk),
    "fetchProdukWithFoto": (()=>fetchProdukWithFoto),
    "fetchTransaksi": (()=>fetchTransaksi)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postgres/src/index.js [app-ssr] (ecmascript)");
;
const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(process.env.POSTGRES_URL, {
    ssl: 'require'
});
async function fetchProduk(id) {
    try {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format.');
        }
        const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      WHERE id_produk = ${numericId}
      LIMIT 1
    `;
        return result[0] || null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch produk by ID.');
    }
}
async function fetchAllProduk() {
    try {
        const result = await sql`
      SELECT id_produk, nama_produk, harga_produk 
      FROM produk 
      ORDER BY id_produk ASC
    `;
        return result;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all produk.');
    }
}
async function fetchTransaksi() {
    try {
        const transaksi = await sql`
      SELECT id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga, quantity
      FROM transaksi
      ORDER BY tanggal_transaksi ASC
    `;
        return transaksi;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch transaksi.');
    }
}
async function fetchAnalytics() {
    try {
        // Query 1: total produk
        const totalProdukRes = await sql`SELECT COUNT(*) AS count FROM produk`;
        const totalProduk = Number(totalProdukRes[0].count);
        // Query 2: total revenue
        const totalRevenueRes = await sql`SELECT SUM(total_harga) AS sum FROM transaksi`;
        const totalRevenue = Number(totalRevenueRes[0].sum || 0);
        // Query 3: produk paling sering muncul
        const mostSoldRes = await sql`
      SELECT p.nama_produk, COUNT(t.id_produk) AS jumlah_terjual
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      GROUP BY p.nama_produk
      ORDER BY jumlah_terjual DESC
      LIMIT 1;
    `;
        const mostSold = mostSoldRes[0];
        return {
            totalProduk,
            totalRevenue,
            mostSold: mostSold?.nama_produk || '-',
            jumlahTerjual: mostSold?.jumlah_terjual || 0
        };
    } catch (err) {
        console.error('DB Error (analytics):', err);
        throw new Error('Failed to fetch analytics data.');
    }
}
async function fetchPenjualanProduk() {
    try {
        const data = await sql`
      SELECT p.nama_produk, COUNT(t.id_produk) AS jumlah_terjual
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      GROUP BY p.nama_produk
      ORDER BY jumlah_terjual DESC
    `;
        return data;
    } catch (err) {
        console.error('DB Error (grafik):', err);
        throw new Error('Gagal ambil data grafik penjualan.');
    }
}
async function fetchProdukWithFoto() {
    try {
        const produk = await sql`SELECT * FROM produk ORDER BY id_produk ASC`;
        return produk;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch produk with foto.');
    }
}
async function addToCart(cartData) {
    try {
        const result = await sql`
      INSERT INTO cart (id_produk, nama_produk, quantity, harga_produk, total_harga, created_at)
      VALUES (${cartData.id_produk}, ${cartData.nama_produk}, ${cartData.quantity}, ${cartData.harga_produk}, ${cartData.total_harga}, NOW())
      RETURNING *
    `;
        return result[0] || null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add to cart');
    }
}
async function createTransaksi(transaksiData) {
    try {
        const result = await sql`
      INSERT INTO transaksi (id_produk, nama_pembeli, tanggal_transaksi, total_harga, quantity)
      VALUES (${transaksiData.id_produk}, ${transaksiData.nama_pembeli}, NOW(), ${transaksiData.total_harga}, ${transaksiData.quantity})
      RETURNING *
    `;
        return result[0] || null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create transaction');
    }
}
async function fetchCartItems() {
    try {
        const result = await sql`
      SELECT c.*, p.nama_produk, p.foto 
      FROM cart c
      JOIN produk p ON c.id_produk = p.id_produk
      ORDER BY c.created_at DESC
    `;
        return result;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cart items');
    }
}
}}),
"[project]/src/app/ui/menu/table.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProdukTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/data.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
async function ProdukTable({ searchParams }) {
    const query = searchParams.query?.toLowerCase() || '';
    const currentPage = parseInt(searchParams.page || '1', 10);
    const itemsPerPage = 5;
    let produkList = [];
    try {
        produkList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllProduk"])();
    } catch (e) {
        console.error('Gagal memuat data produk:', e);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold text-red-600",
                    children: "Gagal memuat data produk"
                }, void 0, false, {
                    fileName: "[project]/src/app/ui/menu/table.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 mt-2",
                    children: "Silakan coba beberapa saat lagi."
                }, void 0, false, {
                    fileName: "[project]/src/app/ui/menu/table.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/ui/menu/table.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    const filtered = produkList.filter((produk)=>produk.nama_produk.toLowerCase().includes(query));
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-lg text-gray-700",
                    children: [
                        "Menampilkan ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: (currentPage - 1) * itemsPerPage + 1
                        }, void 0, false, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 49,
                            columnNumber: 25
                        }, this),
                        " sampai",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: Math.min(currentPage * itemsPerPage, totalItems)
                        }, void 0, false, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this),
                        " dari",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: totalItems
                        }, void 0, false, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        " produk"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/ui/menu/table.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        currentPage > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `?${new URLSearchParams({
                                ...Object.fromEntries(Object.entries(searchParams).filter(([key])=>key !== 'page')),
                                page: String(currentPage - 1)
                            }).toString()}`,
                            className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50",
                            "aria-label": "Halaman sebelumnya",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-4 w-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ui/menu/table.tsx",
                                        lineNumber: 66,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ui/menu/table.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-1 hidden sm:block",
                                    children: "Sebelumnya"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ui/menu/table.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 57,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: Array.from({
                                length: totalPages
                            }, (_, i)=>{
                                const page = i + 1;
                                const params = new URLSearchParams();
                                Object.entries(searchParams).forEach(([key, value])=>{
                                    if (value && key !== 'page') params.set(key, value);
                                });
                                params.set('page', String(page));
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `?${params.toString()}`,
                                    className: `relative inline-flex items-center px-4 py-2 text-lg font-medium border transition-colors duration-200 ${page === currentPage ? 'z-10 bg-red-900 text-white rounded-md' : 'text-gray-900 border-gray-300 hover:bg-gray-50 rounded-md'}`,
                                    "aria-current": page === currentPage ? 'page' : undefined,
                                    "aria-label": `Halaman ${page}`,
                                    children: page
                                }, page, false, {
                                    fileName: "[project]/src/app/ui/menu/table.tsx",
                                    lineNumber: 84,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        currentPage < totalPages && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `?${new URLSearchParams({
                                ...Object.fromEntries(Object.entries(searchParams).filter(([key])=>key !== 'page')),
                                page: String(currentPage + 1)
                            }).toString()}`,
                            className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-lg font-medium text-gray-500 hover:bg-gray-50",
                            "aria-label": "Halaman selanjutnya",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mr-1 hidden sm:block",
                                    children: "Selanjutnya"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ui/menu/table.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-4 w-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ui/menu/table.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ui/menu/table.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/ui/menu/table.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/ui/menu/table.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/ui/menu/table.tsx",
            lineNumber: 47,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
}}),
"[project]/src/app/ui/search.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Search)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/MagnifyingGlassIcon.js [app-ssr] (ecmascript) <export default as MagnifyingGlassIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$debounce$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-debounce/dist/index.module.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Search({ placeholder }) {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const replace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const defaultQuery = searchParams.get("query") || "";
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$debounce$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDebouncedCallback"])((term)=>{
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace.replace(`${pathname}?${params.toString()}`);
    }, 300);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-1 flex-shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "search",
                className: "sr-only",
                children: "Search"
            }, void 0, false, {
                fileName: "[project]/src/app/ui/search.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: "search",
                defaultValue: defaultQuery,
                className: "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500",
                placeholder: placeholder,
                onChange: (e)=>handleSearch(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/app/ui/search.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$MagnifyingGlassIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MagnifyingGlassIcon$3e$__["MagnifyingGlassIcon"], {
                className: "absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
            }, void 0, false, {
                fileName: "[project]/src/app/ui/search.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ui/search.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/lib/data:375425 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4092bf8249b5cf83282f76425a4f104d078960b79c":"deleteMenu"},"src/app/lib/actions.ts",""] */ __turbopack_context__.s({
    "deleteMenu": (()=>deleteMenu)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var deleteMenu = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("4092bf8249b5cf83282f76425a4f104d078960b79c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteMenu"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgeyByZWRpcmVjdCB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5pbXBvcnQgcG9zdGdyZXMgZnJvbSAncG9zdGdyZXMnO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5cbmNvbnN0IHNxbCA9IHBvc3RncmVzKHByb2Nlc3MuZW52LlBPU1RHUkVTX1VSTCEsIHsgc3NsOiAncmVxdWlyZScgfSk7XG5cbmNvbnN0IE1lbnVTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGlkOiB6LnN0cmluZygpLFxuICBuYW1hX3Byb2R1azogei5zdHJpbmcoKSxcbiAgaGFyZ2FfcHJvZHVrOiB6Lm51bWJlcigpLFxufSk7XG5cbmNvbnN0IFRyYW5zYWtzaVNjaGVtYSA9IHoub2JqZWN0KHtcbiAgaWQ6IHouc3RyaW5nKCksXG4gIGlkX3Byb2R1azogei5zdHJpbmcoKSxcbiAgbmFtYV9wZW1iZWxpOiB6LnN0cmluZygpLFxuICB0b3RhbF9oYXJnYTogei5udW1iZXIoKSxcbiAgdGFuZ2dhbF90cmFuc2Frc2k6IHouc3RyaW5nKCksXG4gIHF1YW50aXR5OiB6Lm51bWJlcigpLm9wdGlvbmFsKCksXG59KTtcblxuY29uc3QgQ3JlYXRlTWVudSA9IE1lbnVTY2hlbWEub21pdCh7IGlkOiB0cnVlIH0pO1xuY29uc3QgVXBkYXRlTWVudSA9IE1lbnVTY2hlbWEub21pdCh7IGlkOiB0cnVlIH0pO1xuXG4vLyBNRU5VIEZVTkNUSU9OU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU1lbnUoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBuYW1hX3Byb2R1aywgaGFyZ2FfcHJvZHVrIH0gPSBDcmVhdGVNZW51LnBhcnNlKHtcbiAgICAgIG5hbWFfcHJvZHVrOiBmb3JtRGF0YS5nZXQoJ25hbWFfcHJvZHVrJyksXG4gICAgICBoYXJnYV9wcm9kdWs6IE51bWJlcihmb3JtRGF0YS5nZXQoJ2hhcmdhX3Byb2R1aycpKSxcbiAgICB9KTtcblxuICAgIGF3YWl0IHNxbGBcbiAgICAgIElOU0VSVCBJTlRPIHByb2R1ayAobmFtYV9wcm9kdWssIGhhcmdhX3Byb2R1aylcbiAgICAgIFZBTFVFUyAoJHtuYW1hX3Byb2R1a30sICR7aGFyZ2FfcHJvZHVrfSlcbiAgICBgO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9kYXNoYm9hcmQvbWVudScpO1xuICAgIHJlZGlyZWN0KCcvYWRtaW4vZGFzaGJvYXJkL21lbnUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiR2FnYWwgbWVtYnVhdCBtZW51OlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU1lbnUoaWQ6IHN0cmluZywgZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFpZCB8fCB0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lEIHByb2R1ayB0aWRhayB2YWxpZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmFtYV9wcm9kdWssIGhhcmdhX3Byb2R1ayB9ID0gVXBkYXRlTWVudS5wYXJzZSh7XG4gICAgICBuYW1hX3Byb2R1azogZm9ybURhdGEuZ2V0KCduYW1hX3Byb2R1aycpLFxuICAgICAgaGFyZ2FfcHJvZHVrOiBOdW1iZXIoZm9ybURhdGEuZ2V0KCdoYXJnYV9wcm9kdWsnKSksXG4gICAgfSk7XG5cbiAgICBhd2FpdCBzcWxgXG4gICAgICBVUERBVEUgcHJvZHVrXG4gICAgICBTRVQgbmFtYV9wcm9kdWsgPSAke25hbWFfcHJvZHVrfSwgaGFyZ2FfcHJvZHVrID0gJHtoYXJnYV9wcm9kdWt9XG4gICAgICBXSEVSRSBpZF9wcm9kdWsgPSAke2lkfVxuICAgIGA7XG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL2Rhc2hib2FyZC9tZW51Jyk7XG4gICAgcmVkaXJlY3QoJy9hZG1pbi9kYXNoYm9hcmQvbWVudScpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJHYWdhbCBtZW1wZXJiYXJ1aSBtZW51OlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZU1lbnUoaWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGlmICghaWQgfHwgdHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJRCBwcm9kdWsgdGlkYWsgdmFsaWQnKTtcbiAgICB9XG5cbiAgICBhd2FpdCBzcWxgREVMRVRFIEZST00gcHJvZHVrIFdIRVJFIGlkX3Byb2R1ayA9ICR7aWR9YDtcbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL2Rhc2hib2FyZC9tZW51Jyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdhZ2FsIG1lbmdoYXB1cyBtZW51OlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RCeUlkKGlkOiBudW1iZXIpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWxgXG4gICAgICBTRUxFQ1QgaWRfcHJvZHVrLCBuYW1hX3Byb2R1aywgaGFyZ2FfcHJvZHVrIFxuICAgICAgRlJPTSBwcm9kdWsgXG4gICAgICBXSEVSRSBpZF9wcm9kdWsgPSAke2lkfVxuICAgIGA7XG5cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkX3Byb2R1azogcmVzdWx0WzBdLmlkX3Byb2R1ayxcbiAgICAgIG5hbWFfcHJvZHVrOiByZXN1bHRbMF0ubmFtYV9wcm9kdWssXG4gICAgICBoYXJnYV9wcm9kdWs6IE51bWJlcihyZXN1bHRbMF0uaGFyZ2FfcHJvZHVrKVxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdhZ2FsIG1lbmRhcGF0a2FuIHByb2R1azpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxQcm9kdWN0cygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWxgXG4gICAgICBTRUxFQ1QgaWRfcHJvZHVrLCBuYW1hX3Byb2R1aywgaGFyZ2FfcHJvZHVrIFxuICAgICAgRlJPTSBwcm9kdWsgXG4gICAgICBPUkRFUiBCWSBuYW1hX3Byb2R1ayBBU0NcbiAgICBgO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5tYXAocm93ID0+ICh7XG4gICAgICBpZF9wcm9kdWs6IHJvdy5pZF9wcm9kdWssXG4gICAgICBuYW1hX3Byb2R1azogcm93Lm5hbWFfcHJvZHVrLFxuICAgICAgaGFyZ2FfcHJvZHVrOiBOdW1iZXIocm93LmhhcmdhX3Byb2R1aylcbiAgICB9KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdhZ2FsIG1lbmRhcGF0a2FuIHNlbXVhIHByb2R1azpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUcmFuc2Frc2koZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgaWRfcHJvZHVrID0gZm9ybURhdGEuZ2V0KCdpZF9wcm9kdWsnKTtcbiAgICBjb25zdCBuYW1hX3BlbWJlbGkgPSBmb3JtRGF0YS5nZXQoJ25hbWFfcGVtYmVsaScpO1xuICAgIGNvbnN0IHRvdGFsX2hhcmdhID0gTnVtYmVyKGZvcm1EYXRhLmdldCgndG90YWxfaGFyZ2EnKSk7XG4gICAgY29uc3QgcXVhbnRpdHkgPSBOdW1iZXIoZm9ybURhdGEuZ2V0KCdxdWFudGl0eScpKSB8fCAxO1xuICAgIGNvbnN0IHRhbmdnYWxfdHJhbnNha3NpID0gZm9ybURhdGEuZ2V0KCd0YW5nZ2FsX3RyYW5zYWtzaScpIHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuXG4gICAgY29uc3QgQ3JlYXRlVHJhbnNha3NpV2l0aFF1YW50aXR5ID0gei5vYmplY3Qoe1xuICAgICAgaWRfcHJvZHVrOiB6LnN0cmluZygpLFxuICAgICAgbmFtYV9wZW1iZWxpOiB6LnN0cmluZygpLFxuICAgICAgdG90YWxfaGFyZ2E6IHoubnVtYmVyKCksXG4gICAgICBxdWFudGl0eTogei5udW1iZXIoKS5taW4oMSksXG4gICAgICB0YW5nZ2FsX3RyYW5zYWtzaTogei5zdHJpbmcoKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHZhbGlkYXRlZERhdGEgPSBDcmVhdGVUcmFuc2Frc2lXaXRoUXVhbnRpdHkucGFyc2Uoe1xuICAgICAgaWRfcHJvZHVrLFxuICAgICAgbmFtYV9wZW1iZWxpLFxuICAgICAgdG90YWxfaGFyZ2EsXG4gICAgICBxdWFudGl0eSxcbiAgICAgIHRhbmdnYWxfdHJhbnNha3NpLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgc3FsYFxuICAgICAgSU5TRVJUIElOVE8gdHJhbnNha3NpIChpZF9wcm9kdWssIG5hbWFfcGVtYmVsaSwgdG90YWxfaGFyZ2EsIHRhbmdnYWxfdHJhbnNha3NpLCBxdWFudGl0eSlcbiAgICAgIFZBTFVFUyAoJHt2YWxpZGF0ZWREYXRhLmlkX3Byb2R1a30sICR7dmFsaWRhdGVkRGF0YS5uYW1hX3BlbWJlbGl9LCAke3ZhbGlkYXRlZERhdGEudG90YWxfaGFyZ2F9LCAke3ZhbGlkYXRlZERhdGEudGFuZ2dhbF90cmFuc2Frc2l9LCAke3ZhbGlkYXRlZERhdGEucXVhbnRpdHl9KVxuICAgIGA7XG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL2Rhc2hib2FyZC90cmFuc2Frc2knKTtcbiAgICByZWRpcmVjdCgnL2FkbWluL2Rhc2hib2FyZC90cmFuc2Frc2knKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiR2FnYWwgbWVtYnVhdCB0cmFuc2Frc2k6XCIsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVHJhbnNha3NpKGlkOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWlkIHx8IHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSUQgdHJhbnNha3NpIHRpZGFrIHZhbGlkJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgc3FsYERFTEVURSBGUk9NIHRyYW5zYWtzaSBXSEVSRSBpZF90cmFuc2Frc2kgPSAke2lkfWA7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9kYXNoYm9hcmQvdHJhbnNha3NpJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkdhZ2FsIG1lbmdoYXB1cyB0cmFuc2Frc2k6XCIsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIwUkF5RXNCIn0=
}}),
"[project]/src/app/ui/menu/buttons.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CreateProduk": (()=>CreateProduk),
    "DeleteProduk": (()=>DeleteProduk),
    "UpdateProduk": (()=>UpdateProduk)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PencilIcon.js [app-ssr] (ecmascript) <export default as PencilIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PlusIcon.js [app-ssr] (ecmascript) <export default as PlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/TrashIcon.js [app-ssr] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$data$3a$375425__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/lib/data:375425 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ui$2f$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/ui/fonts.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$alegreya_de173fce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__alegreya$3e$__ = __turbopack_context__.i("[next]/internal/font/google/alegreya_de173fce.js [app-ssr] (ecmascript) <export default as alegreya>");
'use client';
;
;
;
;
;
function CreateProduk() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "/admin/dashboard/menu/create",
        className: `flex h-10 items-center rounded-lg bg-red-800 px-4 text-base font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$alegreya_de173fce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__alegreya$3e$__["alegreya"].className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hidden md:block",
                children: "Tambah Produk"
            }, void 0, false, {
                fileName: "[project]/src/app/ui/menu/buttons.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            ' ',
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PlusIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusIcon$3e$__["PlusIcon"], {
                className: "h-5 md:ml-4"
            }, void 0, false, {
                fileName: "[project]/src/app/ui/menu/buttons.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ui/menu/buttons.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
function UpdateProduk({ id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/admin/dashboard/menu/${id}/edit`,
        className: `rounded-md border p-2 hover:bg-gray-100 ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$alegreya_de173fce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__alegreya$3e$__["alegreya"].className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilIcon$3e$__["PencilIcon"], {
            className: "w-5"
        }, void 0, false, {
            fileName: "[project]/src/app/ui/menu/buttons.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/ui/menu/buttons.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function DeleteProduk({ id }) {
    const handleSubmit = async (formData)=>{
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$data$3a$375425__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteMenu"])(id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        action: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$alegreya_de173fce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__alegreya$3e$__["alegreya"].className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "rounded-md border p-2 hover:bg-gray-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Hapus"
                }, void 0, false, {
                    fileName: "[project]/src/app/ui/menu/buttons.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                    className: "w-5"
                }, void 0, false, {
                    fileName: "[project]/src/app/ui/menu/buttons.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/ui/menu/buttons.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/ui/menu/buttons.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e4a9a70d._.js.map