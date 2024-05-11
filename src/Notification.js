import React, { useEffect } from "react";

export default function Notification(props) {
  const { notify, setNotify } = props;

  useEffect(() => {
    let timer;
    if (notify.isOpen) {
      // Close the notification after 5 seconds
      timer = setTimeout(() => {
        handleClose(null, 'manual');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notify.isOpen]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  const alertColor = () => {
    switch (notify.type) {
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={`${notify.isOpen ? 'fixed' : 'hidden'} inset-0 flex items-start justify-center p-4 pointer-events-none`}>
      <div className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ${alertColor()} text-white`}>
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Icon based on type */}
                {notify.type === 'success' && (
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {notify.type === 'error' && (
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {notify.type === 'info' && (
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0-4h-1v2h1V7z" />
                  </svg>
                )}
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm leading-5">
                  {notify.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button onClick={() => handleClose(null, 'manual')} className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
