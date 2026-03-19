// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { ShoppingCartList } from "@/app/_components/shopping-cart/shopping-cart-list";
// import { CartSummary } from "@/app/_components/shopping-cart/cart-summary";
// import { RecommendedCourses } from "@/app/_components/shopping-cart/recommended-courses";

// export interface Review {
//   id: string;
//   rating: number;
//   comment?: string | null;
// }

// export interface Course {
//   id: string;
//   title: string;
//   description?: string | null;
//   price: number;
//   originalPrice?: number | null;
//   imageUrl?: string | null;
//   totalHours?: number | null;
//   lectures?: number | null;
//   level?: string | null;
//   isBestseller?: boolean | null;
//   isPremium?: boolean | null;
//   freelancer?: {
//     id: string;
//     bio?: string | null;
//     user?: {
//       name?: string | null;
//       email?: string | null;
//     } | null;
//   } | null;
//   reviews?: Review[];
// }

// export interface CartItem {
//   id: string;
//   course: Course;
// }

// export default function ShoppingCartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [removingId, setRemovingId] = useState<string | null>(null);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/shopping-cart", {
//         method: "GET",
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("Cart fetch error:", res.status, errorText);
//         throw new Error(`Failed to fetch cart: ${res.status}`);
//       }

//       const data: CartItem[] = await res.json();
//       setCartItems(data);

//       const uniqueCourses = Array.from(
//         new Map(data.map((item) => [item.course.id, item.course])).values(),
//       );
//       setRecommendedCourses(uniqueCourses);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleRemove = async (itemId: string) => {
//     try {
//       setRemovingId(itemId);

//       const res = await fetch(`/api/shopping-cart/${itemId}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to remove item");
//       }

//       setCartItems((prev) => prev.filter((item) => item.id !== itemId));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   const total = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + item.course.price, 0);
//   }, [cartItems]);

//   const originalTotal = useMemo(() => {
//     return cartItems.reduce(
//       (sum, item) => sum + (item.course.originalPrice ?? item.course.price),
//       0,
//     );
//   }, [cartItems]);

//   if (loading) {
//     return (
//       <div className="mx-auto max-w-7xl px-6 py-10">
//         <h1 className="mb-8 text-5xl font-bold text-slate-900">
//           Shopping Cart
//         </h1>
//         <p className="text-muted-foreground">Loading cart...</p>
//       </div>
//     );
//   }

//   return (
//     <main className="mx-auto max-w-7xl px-6 py-10">
//       <h1 className="mb-10 text-5xl font-bold tracking-tight text-slate-900">
//         Shopping Cart
//       </h1>

//       <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
//         <ShoppingCartList
//           cartItems={cartItems}
//           onRemove={handleRemove}
//           removingId={removingId}
//         />

//         <CartSummary total={total} originalTotal={originalTotal} />
//       </div>

//       <RecommendedCourses courses={recommendedCourses} />
//     </main>
//   );
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   ShoppingCart,
//   Loader2,
//   Calendar,
//   Clock,
//   User,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Trash2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Booking = {
//   id: string;
//   status: "PENDING" | "CONFIRMED" | "CANCELLED";
//   isApproved: boolean | null;
//   startAt: string;
//   endAt: string;
//   createdAt: string;
//   course: {
//     id: string;
//     title: string;
//     price: number;
//     freelancer: {
//       user: {
//         firstName: string | null;
//         lastName: string | null;
//       };
//     };
//   };
//   freelancer: {
//     user: {
//       firstName: string | null;
//       lastName: string | null;
//     };
//   };
// };

// export default function ShoppingCartPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch("/api/shopping-cart");
//       const data = await res.json();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (booking: Booking) => {
//     if (booking.status === "CANCELLED" || booking.isApproved === false) {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
//           <XCircle className="h-4 w-4" />
//           Freelancer татгалзсан
//         </div>
//       );
//     }

//     if (booking.status === "CONFIRMED" && booking.isApproved === true) {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
//           <CheckCircle2 className="h-4 w-4" />
//           Баталгаажсан
//         </div>
//       );
//     }

//     return (
//       <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
//         <AlertCircle className="h-4 w-4" />
//         Хүлээгдэж байна
//       </div>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("mn-MN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("mn-MN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const confirmedBookings = bookings.filter(
//     (b) => b.status === "CONFIRMED" && b.isApproved === true,
//   );

//   const totalPrice = confirmedBookings.reduce(
//     (sum, b) => sum + b.course.price,
//     0,
//   );

//   const canCheckout =
//     bookings.length > 0 &&
//     bookings.every((b) => b.status === "CONFIRMED" && b.isApproved === true);

//   const hasPendingOrRejected = bookings.some(
//     (b) =>
//       b.status === "PENDING" ||
//       b.status === "CANCELLED" ||
//       b.isApproved === false,
//   );

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
//           <ShoppingCart className="h-7 w-7 text-[#135BEC]" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-[#0F172A]">Миний сагс</h1>
//           <p className="text-sm text-[#64748B]">{bookings.length} хичээл</p>
//         </div>
//       </div>

//       {/* Empty state */}
//       {bookings.length === 0 && (
//         <Card className="rounded-2xl">
//           <CardContent className="py-16 text-center">
//             <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
//             <h2 className="text-xl font-semibold text-gray-700">
//               Сагс хоосон байна
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">
//               Хичээл сонгож захиалга өгнө үү
//             </p>
//             <Button
//               onClick={() => router.push("/")}
//               className="mt-6 rounded-xl bg-[#135BEC] px-6"
//             >
//               Хичээл үзэх
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Bookings list */}
//       {bookings.length > 0 && (
//         <div className="space-y-4">
//           {bookings.map((booking) => {
//             const freelancerName =
//               `${booking.course.freelancer.user.firstName || ""} ${booking.course.freelancer.user.lastName || ""}`.trim() ||
//               "Багш";

//             return (
//               <Card
//                 key={booking.id}
//                 className="overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between gap-4">
//                     {/* Content */}
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-lg font-semibold text-[#0F172A]">
//                             {booking.course.title}
//                           </h3>
//                           <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
//                             <User className="h-4 w-4" />
//                             {freelancerName}
//                           </div>
//                         </div>
//                         {getStatusBadge(booking)}
//                       </div>

//                       <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4" />
//                           {formatDate(booking.startAt)}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4" />
//                           {formatTime(booking.startAt)} -{" "}
//                           {formatTime(booking.endAt)}
//                         </div>
//                       </div>

//                       <div className="text-xl font-bold text-[#135BEC]">
//                         ₮{booking.course.price.toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {/* Summary and Checkout */}
//       {bookings.length > 0 && (
//         <Card className="mt-6 rounded-2xl bg-gray-50">
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               {/* Status summary */}
//               {hasPendingOrRejected && (
//                 <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
//                   <div className="flex items-start gap-3">
//                     <AlertCircle className="h-5 w-5 shrink-0" />
//                     <div>
//                       <p className="font-semibold">Анхааруулга</p>
//                       <p className="mt-1">
//                         Та зөвхөн баталгаажсан хичээлүүдэд төлбөр төлөх
//                         боломжтой. Хүлээгдэж байгаа эсвэл татгалзсан
//                         захиалгуудыг арилгана уу.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Total */}
//               <div className="flex items-center justify-between border-t pt-4">
//                 <div>
//                   <p className="text-sm text-[#64748B]">
//                     Нийт ({confirmedBookings.length} хичээл)
//                   </p>
//                   <p className="text-2xl font-bold text-[#0F172A]">
//                     ₮{totalPrice.toLocaleString()}
//                   </p>
//                 </div>

//                 <Button
//                   onClick={() => {
//                     if (canCheckout) {
//                       router.push("/checkout");
//                     }
//                   }}
//                   disabled={!canCheckout}
//                   className="h-12 rounded-xl bg-[#135BEC] px-8 font-semibold disabled:bg-gray-300 disabled:text-gray-500"
//                 >
//                   {canCheckout ? "Төлбөр төлөх" : "Баталгаажуулалт хүлээнэ үү"}
//                 </Button>
//               </div>

//               {/* Info text */}
//               {canCheckout && (
//                 <p className="text-xs text-[#64748B]">
//                   Та бүх баталгаажсан хичээлүүдэд нэг дор төлбөр төлөх боломжтой
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   ShoppingCart,
//   Loader2,
//   Calendar,
//   Clock,
//   User,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Trash2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Booking = {
//   id: string;
//   status: "PENDING" | "CONFIRMED" | "CANCELLED";
//   isApproved: boolean | null;
//   startAt: string;
//   endAt: string;
//   createdAt: string;
//   course: {
//     id: string;
//     title: string;
//     price: number;
//     freelancer: {
//       user: {
//         firstName: string | null;
//         lastName: string | null;
//       };
//     };
//   };
//   freelancer: {
//     user: {
//       firstName: string | null;
//       lastName: string | null;
//     };
//   };
// };

// export default function ShoppingCartPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch("/api/shopping-cart");
//       const data = await res.json();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadge = (booking: Booking) => {
//     if (booking.status === "CANCELLED" || booking.isApproved === false) {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
//           <XCircle className="h-4 w-4" />
//           Freelancer татгалзсан
//         </div>
//       );
//     }

//     if (booking.status === "CONFIRMED" && booking.isApproved === true) {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
//           <CheckCircle2 className="h-4 w-4" />
//           Баталгаажсан
//         </div>
//       );
//     }

//     return (
//       <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
//         <AlertCircle className="h-4 w-4" />
//         Хүлээгдэж байна
//       </div>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("mn-MN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("mn-MN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const confirmedBookings = bookings.filter(
//     (b) => b.status === "CONFIRMED" && b.isApproved === true,
//   );

//   const pendingBookings = bookings.filter(
//     (b) => b.status === "PENDING" && b.isApproved !== false,
//   );

//   const rejectedBookings = bookings.filter(
//     (b) => b.status === "CANCELLED" || b.isApproved === false,
//   );

//   const totalPrice = confirmedBookings.reduce(
//     (sum, b) => sum + b.course.price,
//     0,
//   );

//   // Can checkout if at least one booking is confirmed
//   const canCheckout = confirmedBookings.length > 0;

//   const hasPending = pendingBookings.length > 0;
//   const hasRejected = rejectedBookings.length > 0;

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
//           <ShoppingCart className="h-7 w-7 text-[#135BEC]" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-[#0F172A]">Миний сагс</h1>
//           <p className="text-sm text-[#64748B]">{bookings.length} хичээл</p>
//         </div>
//       </div>

//       {/* Empty state */}
//       {bookings.length === 0 && (
//         <Card className="rounded-2xl">
//           <CardContent className="py-16 text-center">
//             <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
//             <h2 className="text-xl font-semibold text-gray-700">
//               Сагс хоосон байна
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">
//               Хичээл сонгож захиалга өгнө үү
//             </p>
//             <Button
//               onClick={() => router.push("/")}
//               className="mt-6 rounded-xl bg-[#135BEC] px-6"
//             >
//               Хичээл үзэх
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Bookings list */}
//       {bookings.length > 0 && (
//         <div className="space-y-4">
//           {bookings.map((booking) => {
//             const freelancerName =
//               `${booking.course.freelancer.user.firstName || ""} ${booking.course.freelancer.user.lastName || ""}`.trim() ||
//               "Багш";

//             return (
//               <Card
//                 key={booking.id}
//                 className="overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between gap-4">
//                     {/* Content */}
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-lg font-semibold text-[#0F172A]">
//                             {booking.course.title}
//                           </h3>
//                           <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
//                             <User className="h-4 w-4" />
//                             {freelancerName}
//                           </div>
//                         </div>
//                         {getStatusBadge(booking)}
//                       </div>

//                       <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4" />
//                           {formatDate(booking.startAt)}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4" />
//                           {formatTime(booking.startAt)} -{" "}
//                           {formatTime(booking.endAt)}
//                         </div>
//                       </div>

//                       <div className="text-xl font-bold text-[#135BEC]">
//                         ₮{booking.course.price.toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {/* Summary and Checkout */}
//       {bookings.length > 0 && (
//         <Card className="mt-6 rounded-2xl bg-gray-50">
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               {/* Status summary */}
//               {(hasPending || hasRejected) && (
//                 <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
//                   <div className="flex items-start gap-3">
//                     <AlertCircle className="h-5 w-5 shrink-0" />
//                     <div>
//                       <p className="font-semibold">Мэдээлэл</p>
//                       <p className="mt-1">
//                         Та баталгаажсан хичээлүүдэд төлбөр төлөх боломжтой.
//                         {hasPending &&
//                           " Хүлээгдэж байгаа захиалгууд багш баталгаажуулах болно."}
//                         {hasRejected &&
//                           " Татгалзсан захиалгууд төлбөрт тооцогдохгүй."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Total */}
//               <div className="flex items-center justify-between border-t pt-4">
//                 <div>
//                   <p className="text-sm text-[#64748B]">
//                     Нийт ({confirmedBookings.length} хичээл)
//                   </p>
//                   <p className="text-2xl font-bold text-[#0F172A]">
//                     ₮{totalPrice.toLocaleString()}
//                   </p>
//                 </div>

//                 <Button
//                   onClick={() => {
//                     if (canCheckout) {
//                       router.push("/checkout");
//                     }
//                   }}
//                   disabled={!canCheckout}
//                   className="h-12 rounded-xl bg-[#135BEC] px-8 font-semibold disabled:bg-gray-300 disabled:text-gray-500"
//                 >
//                   {canCheckout
//                     ? `Төлбөр төлөх (${confirmedBookings.length})`
//                     : "Баталгаажсан хичээл байхгүй"}
//                 </Button>
//               </div>

//               {/* Info text */}
//               {canCheckout && (
//                 <p className="text-xs text-[#64748B]">
//                   Та {confirmedBookings.length} баталгаажсан хичээл
//                   {confirmedBookings.length > 1 ? "үүдэд" : "д"} төлбөр төлөх
//                   боломжтой
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   ShoppingCart,
//   Loader2,
//   Calendar,
//   Clock,
//   User,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Booking = {
//   id: string;
//   status: "PENDING" | "CONFIRMED" | "CANCELLED";
//   isApproved: boolean | null;
//   startAt: string;
//   endAt: string;
//   createdAt: string;
//   course: {
//     id: string;
//     title: string;
//     price: number;
//     freelancer: {
//       user: {
//         firstName: string | null;
//         lastName: string | null;
//       };
//     };
//   };
//   freelancer: {
//     user: {
//       firstName: string | null;
//       lastName: string | null;
//     };
//   };
// };

// export default function ShoppingCartPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch("/api/shopping-cart");
//       const data = await res.json();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ ЗАСВАР: status-г ЭХЛЭЭД шалгана, isApproved-г зөвхөн CONFIRMED/CANCELLED үед л харна
//   const getStatusBadge = (booking: Booking) => {
//     // 1. PENDING → ямар ч тохиолдолд "Хүлээгдэж байна"
//     if (booking.status === "PENDING") {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
//           <AlertCircle className="h-4 w-4" />
//           Хүлээгдэж байна
//         </div>
//       );
//     }

//     // 2. CONFIRMED + isApproved === true → "Баталгаажсан"
//     if (booking.status === "CONFIRMED" && booking.isApproved === true) {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
//           <CheckCircle2 className="h-4 w-4" />
//           Баталгаажсан
//         </div>
//       );
//     }

//     // 3. CANCELLED эсвэл isApproved === false → "Татгалзсан"
//     if (booking.status === "CANCELLED") {
//       return (
//         <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
//           <XCircle className="h-4 w-4" />
//           Freelancer татгалзсан
//         </div>
//       );
//     }

//     // Fallback
//     return (
//       <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
//         <AlertCircle className="h-4 w-4" />
//         Хүлээгдэж байна
//       </div>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("mn-MN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("mn-MN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const confirmedBookings = bookings.filter(
//     (b) => b.status === "CONFIRMED" && b.isApproved === true,
//   );

//   // ✅ PENDING бол isApproved хамаагүй
//   const pendingBookings = bookings.filter((b) => b.status === "PENDING");

//   const rejectedBookings = bookings.filter((b) => b.status === "CANCELLED");

//   const totalPrice = confirmedBookings.reduce(
//     (sum, b) => sum + b.course.price,
//     0,
//   );

//   const canCheckout = confirmedBookings.length > 0;
//   const hasPending = pendingBookings.length > 0;
//   const hasRejected = rejectedBookings.length > 0;

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
//           <ShoppingCart className="h-7 w-7 text-[#135BEC]" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-[#0F172A]">Миний сагс</h1>
//           <p className="text-sm text-[#64748B]">{bookings.length} хичээл</p>
//         </div>
//       </div>

//       {/* Empty state */}
//       {bookings.length === 0 && (
//         <Card className="rounded-2xl">
//           <CardContent className="py-16 text-center">
//             <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
//             <h2 className="text-xl font-semibold text-gray-700">
//               Сагс хоосон байна
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">
//               Хичээл сонгож захиалга өгнө үү
//             </p>
//             <Button
//               onClick={() => router.push("/")}
//               className="mt-6 rounded-xl bg-[#135BEC] px-6"
//             >
//               Хичээл үзэх
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Bookings list */}
//       {bookings.length > 0 && (
//         <div className="space-y-4">
//           {bookings.map((booking) => {
//             const freelancerName =
//               `${booking.course.freelancer.user.firstName || ""} ${booking.course.freelancer.user.lastName || ""}`.trim() ||
//               "Багш";

//             return (
//               <Card
//                 key={booking.id}
//                 className="overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-lg font-semibold text-[#0F172A]">
//                             {booking.course.title}
//                           </h3>
//                           <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
//                             <User className="h-4 w-4" />
//                             {freelancerName}
//                           </div>
//                         </div>
//                         {getStatusBadge(booking)}
//                       </div>

//                       <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4" />
//                           {formatDate(booking.startAt)}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4" />
//                           {formatTime(booking.startAt)} -{" "}
//                           {formatTime(booking.endAt)}
//                         </div>
//                       </div>

//                       <div className="text-xl font-bold text-[#135BEC]">
//                         ₮{booking.course.price.toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {/* Summary and Checkout */}
//       {bookings.length > 0 && (
//         <Card className="mt-6 rounded-2xl bg-gray-50">
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               {(hasPending || hasRejected) && (
//                 <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
//                   <div className="flex items-start gap-3">
//                     <AlertCircle className="h-5 w-5 shrink-0" />
//                     <div>
//                       <p className="font-semibold">Мэдээлэл</p>
//                       <p className="mt-1">
//                         Та баталгаажсан хичээлүүдэд төлбөр төлөх боломжтой.
//                         {hasPending &&
//                           " Хүлээгдэж байгаа захиалгууд багш баталгаажуулах болно."}
//                         {hasRejected &&
//                           " Татгалзсан захиалгууд төлбөрт тооцогдохгүй."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center justify-between border-t pt-4">
//                 <div>
//                   <p className="text-sm text-[#64748B]">
//                     Нийт ({confirmedBookings.length} хичээл)
//                   </p>
//                   <p className="text-2xl font-bold text-[#0F172A]">
//                     ₮{totalPrice.toLocaleString()}
//                   </p>
//                 </div>

//                 <Button
//                   onClick={() => {
//                     if (canCheckout) {
//                       router.push("/checkout");
//                     }
//                   }}
//                   disabled={!canCheckout}
//                   className="h-12 rounded-xl bg-[#135BEC] px-8 font-semibold disabled:bg-gray-300 disabled:text-gray-500"
//                 >
//                   {canCheckout
//                     ? `Төлбөр төлөх (${confirmedBookings.length})`
//                     : "Баталгаажсан хичээл байхгүй"}
//                 </Button>
//               </div>

//               {canCheckout && (
//                 <p className="text-xs text-[#64748B]">
//                   Та {confirmedBookings.length} баталгаажсан хичээл
//                   {confirmedBookings.length > 1 ? "үүдэд" : "д"} төлбөр төлөх
//                   боломжтой
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Loader2,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  isApproved: boolean | null;
  paymentStatus: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  course: {
    id: string;
    title: string;
    price: number;
    freelancer: {
      user: {
        name: string | null;
      };
    };
  };
  freelancer: {
    user: {
      name: string | null;
    };
  };
};

export default function ShoppingCartPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/shopping-cart");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === "PENDING") {
      return (
        <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
          <AlertCircle className="h-4 w-4" />
          Хүлээгдэж байна
        </div>
      );
    }

    if (booking.status === "CONFIRMED" && booking.isApproved === true) {
      return (
        <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          Баталгаажсан
        </div>
      );
    }

    if (booking.status === "CANCELLED") {
      return (
        <div className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
          <XCircle className="h-4 w-4" />
          Татгалзсан
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
        <AlertCircle className="h-4 w-4" />
        Хүлээгдэж байна
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Зөвхөн CONFIRMED, UNPAID захиалгуудыг checkout хийнэ
  const confirmedBookings = bookings.filter(
    (b) =>
      b.status === "CONFIRMED" &&
      b.isApproved === true &&
      b.paymentStatus !== "PAID",
  );

  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const rejectedBookings = bookings.filter((b) => b.status === "CANCELLED");

  const totalPrice = confirmedBookings.reduce(
    (sum, b) => sum + b.course.price,
    0,
  );

  const canCheckout = confirmedBookings.length > 0;
  const hasPending = pendingBookings.length > 0;
  const hasRejected = rejectedBookings.length > 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <ShoppingCart className="h-7 w-7 text-[#135BEC]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Миний сагс</h1>
          <p className="text-sm text-[#64748B]">{bookings.length} хичээл</p>
        </div>
      </div>

      {/* Empty state */}
      {bookings.length === 0 && (
        <Card className="rounded-2xl">
          <CardContent className="py-16 text-center">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-700">
              Сагс хоосон байна
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Хичээл сонгож захиалга өгнө үү
            </p>
            <Button
              onClick={() => router.push("/")}
              className="mt-6 rounded-xl bg-[#135BEC] px-6"
            >
              Хичээл үзэх
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bookings list */}
      {bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const freelancerName =
              booking.course.freelancer.user.name || "Багш";

            return (
              <Card
                key={booking.id}
                className="overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0F172A]">
                            {booking.course.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                            <User className="h-4 w-4" />
                            {freelancerName}
                          </div>
                        </div>
                        {getStatusBadge(booking)}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(booking.startAt)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {formatTime(booking.startAt)} -{" "}
                          {formatTime(booking.endAt)}
                        </div>
                      </div>

                      <div className="text-xl font-bold text-[#135BEC]">
                        ₮{booking.course.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Summary and Checkout */}
      {bookings.length > 0 && (
        <Card className="mt-6 rounded-2xl bg-gray-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {(hasPending || hasRejected) && (
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-semibold">Мэдээлэл</p>
                      <p className="mt-1">
                        Та баталгаажсан хичээлүүдэд төлбөр төлөх боломжтой.
                        {hasPending &&
                          " Хүлээгдэж байгаа захиалгууд багш баталгаажуулах болно."}
                        {hasRejected &&
                          " Татгалзсан захиалгууд төлбөрт тооцогдохгүй."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-sm text-[#64748B]">
                    Нийт ({confirmedBookings.length} хичээл)
                  </p>
                  <p className="text-2xl font-bold text-[#0F172A]">
                    ₮{totalPrice.toLocaleString()}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    if (canCheckout) router.push("/checkout");
                  }}
                  disabled={!canCheckout}
                  className="h-12 rounded-xl bg-[#135BEC] px-8 font-semibold disabled:bg-gray-300 disabled:text-gray-500"
                >
                  {canCheckout
                    ? `Төлбөр төлөх (${confirmedBookings.length})`
                    : "Баталгаажсан хичээл байхгүй"}
                </Button>
              </div>

              {canCheckout && (
                <p className="text-xs text-[#64748B]">
                  Та {confirmedBookings.length} баталгаажсан хичээл
                  {confirmedBookings.length > 1 ? "үүдэд" : "д"} төлбөр төлөх
                  боломжтой
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
