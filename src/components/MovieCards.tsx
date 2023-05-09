import React, { useState } from "react";
import { Movie } from "./Movie";
import { SimpleGrid, Card, CardBody,Text,CardHeader, Image, Box, Heading, Flex, Spacer, CardFooter, Stack, HStack, Container, RadioGroup, Radio, Center } from "@chakra-ui/react";
import { moviesList } from "./MoviesList";
import { Button } from "@chakra-ui/react";
import { Popover, PopoverBody,PopoverTrigger, PopoverArrow, PopoverCloseButton,PopoverContent} from "@chakra-ui/react";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { useDrag } from "react-dnd";
import "/Users/juliaoneill/Team5-MoviePedia/src/components/DragDropList.css";

export function getMovies(movies: Movie[]): Movie[] {
    const movieCopy = movies.map((movieData: Movie): Movie => ({...movieData}));
    movieCopy.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return movieCopy;
}

export function MovieCards({
    role
}: {
    role: string;
}): JSX.Element {

    function changeDrag(event: React.DragEvent, widgetType: Movie) {
        event.dataTransfer.setData("widgetType", JSON.stringify(widgetType));
    }

    
    const [movieList, setMovieList] = useState<Movie[]>(getMovies(moviesList));
    const [sort, setSort] = useState<string>("title1");

    function expandArray(array: string[]): string {
        const copy = [...array];
        const listOfItems = copy.join(", ");
        return listOfItems;
    }

    function sortList(type: string) {
        let sortedList: Movie[] = moviesList.slice(0); // make copy
        if (type == "title1") {
            sortedList.sort(function(a,b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        } else if (type == "title2") {
            sortedList.sort(function(a,b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return x < y ? 1 : x > y ? -1 : 0;
            });
        } else if (type == "year1") {
            sortedList.sort(function(a,b) {
                return a.year - b.year;
            });
        } else if (type == "year2") {
            sortedList.sort(function(a,b) {
                return b.year - a.year;
            });
        } else if (type == "director") {
            sortedList.sort(function(a,b) {
                var x = a.director.toLowerCase();
                var y = b.director.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }
        setMovieList(sortedList);
    }

    function addSortField(): JSX.Element {
        if (role == "Super") {
            return (
                <div>
                    <Heading size="md">Sort by:</Heading>
                    <Center mb={3}>
                        <RadioGroup onChange={type => {
                            sortList(type);
                            setSort(type);
                        }} value={sort}>
                            <Stack direction='row'>
                                <Radio borderColor="black" colorScheme='red' p={[0,2]} value='title1'>Title (A-Z)</Radio>
                                <Radio borderColor="black" colorScheme='red' p={[0,2]} value='title2'>Title (Z-A)</Radio>
                                <Radio borderColor="black" colorScheme='red' p={[0,2]} value='year1'>Year (Old to New)</Radio>
                                <Radio borderColor="black" colorScheme='red' p={[0,2]} value='year2'>Year (New to Old)</Radio>
                                <Radio borderColor="black" colorScheme='red' p={[0,2]} value='director'>Director</Radio>
                            </Stack>
                        </RadioGroup>
                    </Center>
                </div>
            );
        } else {
            return <></>;
        }
    }

    return(
        <div id="movie-list">
            {addSortField()}
            <SimpleGrid h="430%" w="100%" p="4"  spacing = {2} templateColumns={{base: "repeat(4, 1fr)"}}>
                {movieList.map((movie)=>(
                    <div key={null} draggable
                        onDragStart={(event) => changeDrag(event, movie)}>
                        <Card align="center" backgroundColor="gray.300" border="1px solid #aaa" pb={5} maxW="md" direction={{base: "row", sm:"column"}} overflow="hidden" variant="elevated" key={movie.name}>
                            <CardHeader key={movie.name}>
                                <Heading size="md">
                                    <Text><span>{movie.name} ({movie.year})</span></Text>
                                </Heading>
                                <Text><i>{movie.director}</i></Text>
                            </CardHeader>
                            <CardBody mt={-5}>
                                <Image width={120} src={movie.poster} alt={movie.name}></Image>
                                <div></div>
                            </CardBody>
                            <Popover>
                                <PopoverTrigger>
                                    <Button>Show More</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton/>
                                    <PopoverBody>
                                        <Text></Text>
                                        <Text fontSize="xs" key={movie.plot}>{movie.plot}</Text>
                                        <Text fontSize="xs">          
                                            <br/>                      
                                            <span>Actors: {expandArray(movie.actors)}</span>
                                            <br/>
                                            <span>Genre: {expandArray(movie.genre)}</span>
                                        </Text>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Card>
                    </div>
                ))}
            </SimpleGrid>
        </div>
    );
}