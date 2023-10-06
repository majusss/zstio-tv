import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface CMSData {
  useShortSchedule: boolean;
  useHint: boolean;
  useCustomHint: boolean;
  customHint: string;
  useSpotify: boolean;
  useLuckyNumber: boolean;
  activeScreenIndex: number;
}

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  cmsData: CMSData;
  updateCMSData: (newCMSData: CMSData) => void;
}

const defaultCMSData: CMSData = {
  useShortSchedule: false,
  useHint: true,
  useCustomHint: false,
  customHint:
    "Zgodnie z §47, pkt 2, ppkt 8 Statutu ZSTiO, uczeń ma zakaz opuszczania terenu szkoły podczas trwania zajec i miedzy nimi",
  useSpotify: true,
  useLuckyNumber: true,
  activeScreenIndex: 0,
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: FC<DataContextProps> = ({ children }) => {
  const [cmsData, setCMSData] = useState<CMSData>(defaultCMSData);

  const updateCMSData = (newCMSData: CMSData) => {
    setCMSData(newCMSData);
  };

  return (
    <DataContext.Provider value={{ cmsData, updateCMSData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useCMSData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useCMSData must be used within a DataProvider");
  }
  return context;
};
