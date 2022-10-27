import { QrReader } from "react-qr-reader";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

const QrScanner = (props) => {
  const {
    buttonPopup,
    qrData,
    setQrData,
    bulbIdList,
    currentLampId,
    setCurrentBulbId,
    setValue,
    GraphQLHandler,
    activeMap,
    setButtonPopup,
  } = useContext(GlobalContext);

  const checkIfBulbExists = (bulb) => {
    if (bulb in bulbIdList) {
      setCurrentBulbId(bulb);
      setValue(bulb);
      GraphQLHandler(
        currentLampId,
        "lat",
        "lng",
        "updateBulbId",
        activeMap,
        bulb
      );
      setButtonPopup(false);
      return true;
    } else {
      setQrData("Bulb is allready used or QR code is invalid");
    }
  };

  return buttonPopup ? (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            checkIfBulbExists(result?.text)
              ? console.log("viewresult", result?.text)
              : console.log("viewresult", result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "50%" }}
      />
      <p>{qrData}</p>
    </>
  ) : (
    ""
  );
};

export default QrScanner;
