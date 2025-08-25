import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Field,
  Input,
  InputGroup,
  SimpleGrid,
  CloseButton,
  Text,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

interface IPDataAPIProps {
  ip: string;
  asn: string;
  as_name: string;
  as_domain: string;
  country_code: string;
  country: string;
  continent_code: string;
  continent: string;
}

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const [ipAPIData, setIpAPIData] = useState<IPDataAPIProps>();
  const [defaultIPData, setDefaultIPData] = useState<IPDataAPIProps>();
  const [ipAddress, setIpAddress] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchDefaultIP = async () => {
      try {
        const res = await fetch(
          "https://api.ipinfo.io/lite/me?token=8a1e87ded9326f"
        );
        if (!res.ok) throw new Error("Failed to fetch IP data");
        const data = await res.json();
        setDefaultIPData(data);
        setIpAPIData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDefaultIP();
  }, []);

  const getData = async (ip: string) => {
    try {
      const res = await fetch(
        `https://api.ipinfo.io/lite/${ip ? ip : "me"}?token=8a1e87ded9326f`
      );

      if (!res.ok) {
        alert("Invalid IP address.");
        setIpAPIData(undefined);
        return;
      }

      const data = await res.json();

      if (!data.ip) {
        alert("Invalid IP address.");
        setIpAPIData(undefined);
        return;
      }

      setIpAPIData(data);

      if (!ip) {
        setDefaultIPData(data);
      }
    } catch (err) {
      console.error(err);
      setIpAPIData(undefined);
    }
  };

  useEffect(() => {
    if (ipAddress === "") {
      setIpAPIData(defaultIPData);
    }
  }, [ipAddress, defaultIPData]);

  const handleIPAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpAddress(e.target.value);
  };

  const handleSearch = () => {
    if (!ipAddress.trim()) {
      alert("Please enter an IP address to search.");
      return;
    }

    getData(ipAddress);

    setHistory((prev) => {
      if (!prev.includes(ipAddress)) {
        return [...prev, ipAddress];
      }
      return prev;
    });
  };

  const handleClear = () => {
    setIpAddress("");
    inputRef.current?.focus();
  };

  const handleHistoryClick = (ip: string) => {
    setIpAddress(ip);
    getData(ip);
  };

  const handleCheckboxChange = (ip: string, checked: boolean) => {
    setSelectedHistory((prev) => {
      if (checked) {
        return [...prev, ip];
      } else {
        return prev.filter((item) => item !== ip);
      }
    });
  };

  const endElement = ipAddress ? (
    <CloseButton size="xs" onClick={handleClear} me="-2" />
  ) : undefined;

  return (
    <Box>
      {/* Logout button */}
      <Flex justify="flex-end" p="4">
        <Button onClick={onLogout} colorScheme="red" size="sm">
          Logout
        </Button>
      </Flex>

      <SimpleGrid columns={2} gap="24px">
        {/* Input/Search Box */}
        <Box
          w="90%"
          mx="auto"
          p="6"
          borderRadius="xl"
          bgColor="gray.900"
        >
          <Field.Root orientation="vertical">
            <Field.Label>IP Address Lookup</Field.Label>
            <Box display="flex" gap="4px" w="100%">
              <InputGroup endElement={endElement} w="80%">
                <Input
                  ref={inputRef}
                  value={ipAddress}
                  onChange={handleIPAddressChange}
                  placeholder="Enter IP Address here"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </InputGroup>
              <Button w="20%" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {history.length > 0 && (
              <Box mt="2">
                <Text fontWeight="bold">History:</Text>
                {history.map((ip, index) => {
                  const checked = selectedHistory.includes(ip);
                  return (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      mt="1"
                      w="100%"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          handleCheckboxChange(ip, e.target.checked)
                        }
                      />
                      <Button
                        size="sm"
                        ml="2"
                        onClick={() => handleHistoryClick(ip)}
                      >
                        {ip}
                      </Button>
                    </Box>
                  );
                })}
                {selectedHistory.length > 0 && (
                  <Button
                    mt="2"
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      setHistory((prev) =>
                        prev.filter((ip) => !selectedHistory.includes(ip))
                      );
                      setSelectedHistory([]);
                    }}
                  >
                    Delete Selected
                  </Button>
                )}
              </Box>
            )}
          </Field.Root>
        </Box>

        {/* IP Info Display */}
        <Box w="90%">
          <SimpleGrid
            columns={1}
            gap="4px"
            w="100%"
            mx="auto"
            p="6"
            borderRadius="xl"
            bgColor="gray.900"
          >
            <>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">IP Address</Text>
                <Text>{ipAPIData && ipAPIData.ip}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">ASN</Text>
                <Text>{ipAPIData && ipAPIData.asn}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">ASN Name</Text>
                <Text>{ipAPIData && ipAPIData.as_name}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">ASN Domain</Text>
                <Text>{ipAPIData && ipAPIData.as_domain}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">Country Code</Text>
                <Text>{ipAPIData && ipAPIData.country_code}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">Country</Text>
                <Text>{ipAPIData && ipAPIData.country}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">Continent Code</Text>
                <Text>{ipAPIData && ipAPIData.continent_code}</Text>
              </Box>
              <Box
                height="20"
                bgColor="gray.800"
                display="flex"
                px="3"
                flexDirection="column"
                justifyContent="center"
              >
                <Text fontWeight="bold">Continent</Text>
                <Text>{ipAPIData && ipAPIData.continent}</Text>
              </Box>
            </>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;