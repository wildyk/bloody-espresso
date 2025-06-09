(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[next]/internal/font/google/nosifer_71025dcc.js [app-client] (ecmascript) <export default as nosifer>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "nosifer": (()=>__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nosifer_71025dcc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nosifer_71025dcc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/nosifer_71025dcc.js [app-client] (ecmascript)");
}}),
"[project]/src/app/menu/menu-client.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MenuClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ui$2f$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/ui/fonts.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nosifer_71025dcc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__nosifer$3e$__ = __turbopack_context__.i("[next]/internal/font/google/nosifer_71025dcc.js [app-client] (ecmascript) <export default as nosifer>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MenuClient({ produkList }) {
    _s();
    const [selectedProduk, setSelectedProduk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[openModal]": (produk)=>{
            setSelectedProduk(produk);
            setIsModalOpen(true);
            setQuantity(1);
            document.body.style.overflow = 'hidden';
        }
    }["MenuClient.useCallback[openModal]"], []);
    const closeModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[closeModal]": ()=>{
            setIsModalOpen(false);
            setSelectedProduk(null);
            setQuantity(1);
            document.body.style.overflow = 'unset';
        }
    }["MenuClient.useCallback[closeModal]"], []);
    // Handle escape key to close modal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuClient.useEffect": ()=>{
            const handleEscape = {
                "MenuClient.useEffect.handleEscape": (event)=>{
                    if (event.key === 'Escape' && isModalOpen) {
                        closeModal();
                    }
                }
            }["MenuClient.useEffect.handleEscape"];
            if (isModalOpen) {
                document.addEventListener('keydown', handleEscape);
                return ({
                    "MenuClient.useEffect": ()=>document.removeEventListener('keydown', handleEscape)
                })["MenuClient.useEffect"];
            }
        }
    }["MenuClient.useEffect"], [
        isModalOpen,
        closeModal
    ]);
    // Clean up on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuClient.useEffect": ()=>{
            return ({
                "MenuClient.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["MenuClient.useEffect"];
        }
    }["MenuClient.useEffect"], []);
    // Handle click outside modal to close
    const handleModalOverlayClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[handleModalOverlayClick]": (e)=>{
            if (e.target === e.currentTarget) {
                closeModal();
            }
        }
    }["MenuClient.useCallback[handleModalOverlayClick]"], [
        closeModal
    ]);
    const incrementQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[incrementQuantity]": ()=>{
            setQuantity({
                "MenuClient.useCallback[incrementQuantity]": (prev)=>Math.min(prev + 1, 99)
            }["MenuClient.useCallback[incrementQuantity]"]);
        }
    }["MenuClient.useCallback[incrementQuantity]"], []);
    const decrementQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[decrementQuantity]": ()=>{
            setQuantity({
                "MenuClient.useCallback[decrementQuantity]": (prev)=>Math.max(prev - 1, 1)
            }["MenuClient.useCallback[decrementQuantity]"]);
        }
    }["MenuClient.useCallback[decrementQuantity]"], []);
    const handleAddToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[handleAddToCart]": async ()=>{
            if (!selectedProduk) return;
            setIsLoading(true);
            try {
                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_produk: selectedProduk.id_produk,
                        nama_produk: selectedProduk.nama_produk,
                        quantity: quantity,
                        harga_produk: selectedProduk.harga_produk,
                        total_harga: selectedProduk.harga_produk * quantity
                    })
                });
                const result = await response.json();
                if (response.ok) {
                    alert(`${quantity}x ${selectedProduk.nama_produk} berhasil ditambahkan ke keranjang!`);
                    closeModal();
                } else {
                    throw new Error(result.error || 'Gagal menambahkan ke keranjang');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Gagal menambahkan ke keranjang. Silakan coba lagi.');
            } finally{
                setIsLoading(false);
            }
        }
    }["MenuClient.useCallback[handleAddToCart]"], [
        quantity,
        selectedProduk,
        closeModal
    ]);
    const handleOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuClient.useCallback[handleOrder]": async (produk)=>{
            setIsLoading(true);
            try {
                const response = await fetch('/api/transaksi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_produk: produk.id_produk,
                        nama_produk: produk.nama_produk,
                        quantity: 1,
                        harga_produk: produk.harga_produk,
                        total_harga: produk.harga_produk,
                        nama_pembeli: 'Guest' // Bisa diganti dengan sistem login
                    })
                });
                const result = await response.json();
                if (response.ok) {
                    alert(`Pesanan ${produk.nama_produk} berhasil dibuat!`);
                } else {
                    throw new Error(result.error || 'Gagal membuat pesanan');
                }
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Gagal membuat pesanan. Silakan coba lagi.');
            } finally{
                setIsLoading(false);
            }
        }
    }["MenuClient.useCallback[handleOrder]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full mx-auto px-4",
                children: produkList.map((produk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "bg-[#fcefdc] rounded-xl shadow-lg overflow-hidden text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[#F8E4BE]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full h-64 sm:h-72 md:h-80 bg-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: produk.foto || '/placeholder-coffee.jpg',
                                    alt: `Foto produk ${produk.nama_produk}`,
                                    fill: true,
                                    className: "object-cover cursor-pointer transition-transform duration-300 hover:scale-105",
                                    onClick: ()=>openModal(produk),
                                    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
                                    onError: (e)=>{
                                        e.target.src = '/placeholder-coffee.jpg';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/menu/menu-client.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 sm:p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl sm:text-2xl font-semibold text-[#300000] mb-3 line-clamp-2",
                                        children: produk.nama_produk
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-base text-[#300000]/70 mb-4",
                                        children: "Kopi Premium • Siap Saji"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg sm:text-xl font-bold text-[#300000] mb-6",
                                        children: [
                                            "Rp. ",
                                            produk.harga_produk?.toLocaleString('id-ID') || '0'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>openModal(produk),
                                                className: "bg-[#6b5b95] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#5a4a7a] focus:bg-[#5a4a7a] focus:outline-none focus:ring-2 focus:ring-[#6b5b95] focus:ring-offset-2 transition-colors duration-200 font-medium text-sm sm:text-lg flex-1",
                                                "aria-label": `Lihat detail ${produk.nama_produk}`,
                                                disabled: isLoading,
                                                children: "DETAIL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleOrder(produk),
                                                className: "bg-[#9b684c] text-white py-3 px-4 sm:px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] focus:outline-none focus:ring-2 focus:ring-[#9b684c] focus:ring-offset-2 transition-colors duration-200 font-medium text-sm sm:text-lg flex-1 disabled:opacity-50",
                                                "aria-label": `Pesan ${produk.nama_produk}`,
                                                disabled: isLoading,
                                                children: isLoading ? 'LOADING...' : 'ORDER'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)
                        ]
                    }, produk.id_produk, true, {
                        fileName: "[project]/src/app/menu/menu-client.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/menu/menu-client.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            isModalOpen && selectedProduk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                onClick: handleModalOverlayClick,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "modal-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#fcefdc] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeModal,
                                className: "absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors z-10",
                                "aria-label": "Tutup modal",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/menu/menu-client.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                lineNumber: 211,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full h-64 sm:h-80 md:h-96 bg-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: selectedProduk.foto || '/placeholder-coffee.jpg',
                                    alt: `Foto produk ${selectedProduk.nama_produk}`,
                                    fill: true,
                                    className: "object-cover rounded-t-2xl",
                                    sizes: "(max-width: 768px) 100vw, 672px",
                                    onError: (e)=>{
                                        e.target.src = '/placeholder-coffee.jpg';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/menu/menu-client.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                lineNumber: 219,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 sm:p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "modal-title",
                                        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nosifer_71025dcc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__nosifer$3e$__["nosifer"].className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#300000] mb-4`,
                                        children: selectedProduk.nama_produk
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-6 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg sm:text-xl font-semibold text-[#300000] mb-2",
                                                        children: "Informasi Produk"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 text-sm sm:text-base text-[#300000]/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "ID Produk:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                        lineNumber: 246,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " #",
                                                                    selectedProduk.id_produk
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Kategori:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " Kopi Premium"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Ukuran:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                        lineNumber: 248,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " Regular (350ml)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Status:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " Tersedia"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 241,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg sm:text-xl font-semibold text-[#300000] mb-2",
                                                        children: "Deskripsi"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[#300000]/80 text-sm leading-relaxed",
                                                        children: "Nikmati cita rasa kopi premium yang dipadukan dengan sempurna. Setiap tegukan memberikan pengalaman yang tak terlupakan dengan aroma yang menggugah selera dan rasa yang kaya. Diolah dengan bahan-bahan pilihan terbaik untuk memberikan kualitas terbaik."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 240,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-[#300000]/20 pt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-[#300000]/60 mb-1",
                                                                children: "Harga"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-2xl sm:text-3xl font-bold text-[#300000]",
                                                                children: [
                                                                    "Rp. ",
                                                                    selectedProduk.harga_produk?.toLocaleString('id-ID') || '0'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 270,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-[#300000]/60 mt-1",
                                                                children: [
                                                                    "Total: Rp. ",
                                                                    (selectedProduk.harga_produk * quantity)?.toLocaleString('id-ID') || '0'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: decrementQuantity,
                                                                disabled: quantity <= 1 || isLoading,
                                                                className: "bg-gray-200 text-[#300000] px-4 py-2 rounded-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                                "aria-label": "Kurangi jumlah",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-medium text-[#300000] px-4 min-w-[3rem] text-center",
                                                                children: quantity
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: incrementQuantity,
                                                                disabled: quantity >= 99 || isLoading,
                                                                className: "bg-gray-200 text-[#300000] px-4 py-2 rounded-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                                "aria-label": "Tambah jumlah",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 267,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: closeModal,
                                                        className: "bg-gray-400 text-white py-3 px-6 rounded-full hover:bg-gray-500 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 font-medium flex-1",
                                                        disabled: isLoading,
                                                        children: "TUTUP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleAddToCart,
                                                        className: "bg-[#9b684c] text-white py-3 px-6 rounded-full hover:bg-[#7d543d] focus:bg-[#7d543d] focus:outline-none focus:ring-2 focus:ring-[#9b684c] focus:ring-offset-2 transition-colors duration-200 font-medium sm:flex-[2] disabled:opacity-50",
                                                        disabled: isLoading,
                                                        children: isLoading ? 'MENAMBAHKAN...' : 'TAMBAH KE KERANJANG'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                                lineNumber: 301,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/menu/menu-client.tsx",
                                        lineNumber: 266,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/menu/menu-client.tsx",
                                lineNumber: 232,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/menu/menu-client.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/menu/menu-client.tsx",
                    lineNumber: 209,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/menu/menu-client.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(MenuClient, "QL5d4ujQYH9HdmqDR2Rvaa531Co=");
_c = MenuClient;
var _c;
__turbopack_context__.k.register(_c, "MenuClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__6fda096e._.js.map