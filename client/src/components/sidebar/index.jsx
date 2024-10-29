import { HiX } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import Links from "./components/Links";
import logo from "../../assets/img/logo.png";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import { Html5Qrcode } from "html5-qrcode";
import { useSelector } from "react-redux";
import api from "helpers/api";
import { toast } from "sonner";

const Sidebar = ({ open, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrData, setQrData] = useState("");
  const [scanned, setScanned] = useState(false); // Flag to prevent multiple requests
  const auth = useSelector((state) => state?.auth);
  const qrCodeRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && qrCodeRef.current) {
      // Initialize the scanner instance
      scannerRef.current = new Html5Qrcode(qrCodeRef.current.id);

      // Start the scanner
      scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (!scanned) {
            setQrData(decodedText);
            setScanned(true); // Prevent further scans until reset
            console.log(decodedText);

            try {
              const { data } = await api.post(decodedText, { id: auth?.id });
              toast.success(data?.message);
            } catch (error) {
              console.error("Error confirming order:", error);
            } finally {
              setIsModalOpen(false);
              alert(`Scanned QR Code: ${decodedText}`);
            }
          }
        },
        (error) => {
          console.warn(`QR Code scan error: ${error}`);
        }
      );
    }

    return () => {
      if (scannerRef.current && isModalOpen) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current.clear();
            setScanned(false); // Reset scan flag when scanner is stopped
          })
          .catch((err) => {
            console.warn("Stop error:", err);
          });
      }
    };
  }, [isModalOpen, scanned]);

  return (
    <>
      <div
        className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
          open ? "translate-x-0" : "-translate-x-96"
        }`}
      >
        <span
          className="absolute top-4 right-4 block cursor-pointer xl:hidden"
          onClick={onClose}
        >
          <HiX />
        </span>
        <div className="flex items-center justify-center">
          <img src={logo} alt="qrit" width={100} className="" />
        </div>
        <div className="mt-[28px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
        
        {/* Nav item */}
        <ul className="mb-auto pt-1">
          <Links routes={routes} />
        </ul>

        {/* Free Horizon Card */}
        <div className="flex justify-center">
          <SidebarCard />
        </div>

        {/* Scan QR Code Button */}
        {auth?.role === "employee" && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative w-full py-2 px-6 mx-2 bg-[#EF233C] text-white font-semibold rounded-lg shadow-lg hover:bg-[#D90429] transition-transform duration-300 ease-in-out"
            >
              Scan QR Commande
            </button>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-navy-800 p-5 rounded-lg shadow-lg w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              <HiX />
            </button>
            <div id="qrCodeReader" ref={qrCodeRef} style={{ width: "100%" }} />
            <p className="text-center mt-2">Scan a QR code to send the order</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
