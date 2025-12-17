import { HeroSection } from "../components/Hero/Herosection.jsx";
import { DestinationView } from "../components/Destination/Destinationview.jsx";
import { LoadingState } from "../components/common/LoadingState.jsx";
import { ErrorState } from "../components/common/ErrorState.jsx";
import { useDestinationData } from "../hooks/useDestinationdata.jsx";
const Index = () => {
  const { loading, error, data, fetchDestinationData, clearData } = useDestinationData();

  const handleSearch = (destination) => {
    fetchDestinationData(destination);
  };

  const handleBack = () => {
    clearData();
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleBack} />;
  }

  if (data) {
    return <DestinationView data={data} onBack={handleBack} />;
  }

  return <HeroSection onSearch={handleSearch} />;
};

export default Index;
