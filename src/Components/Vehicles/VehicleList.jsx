import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleShort from "./VehicleShort";
import { pageButton } from "../PageButton/PageButton";
import { getData } from "../../API";

const VehicleList = () => {
    const [basePage, setBasePage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [vehiclesData, setVehiclesData] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get("category")) {
            setBasePage(true);
            setIsLoading(true);
            let page = searchParams.get("page") ? `?page=${searchParams.get("page")}` : "";
            getData(`https://swapi.dev/api/vehicles/${page}`).then(res => {
                if (res.success) {
                    setVehiclesData(res);
                }
            })
            .catch(error => {;
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
        else {
            setIsLoading(true);
            getData(`https://swapi.dev/api/${searchParams.get("category")}/${searchParams.get("id")}`).then(res => {
                if (res.success) {
                    setVehiclesData(res);
                }
            })
            .catch(error => {;
                console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
    }, [searchParams]);

    if (isLoading) {
        return <div>Loading...</div>;
      } else if (vehiclesData.success) {
        const vehiclesForView = vehiclesData.results || vehiclesData.vehicles || [];
        return (
            <div>
              <h1>Vehicles {!basePage && `(with ${searchParams.get("category") === "films" ? vehiclesData.title : vehiclesData.name})`}</h1>
              {vehiclesData.previous ? pageButton("Previous page", vehiclesData.previous.substring(vehiclesData.previous.indexOf("?"))) : null}
              {vehiclesData.next ? pageButton("Next page", vehiclesData.next.substring(vehiclesData.next.indexOf("?"))) : null}
              <br />
              {vehiclesForView.map(vehicle => <VehicleShort vehicle={vehicle.url || vehicle} key={vehicle.url || vehicle}/>)}
            </div>
        );
      } else {
        return <div>Error: open console to see log.</div>;
    }
}

export default VehicleList;