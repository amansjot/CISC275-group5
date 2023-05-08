import React, { useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from "@chakra-ui/accordion";
import { Box, Heading, Spacer } from "@chakra-ui/layout";
import { Movie } from "./Movie";
import movie from "../../movie.json";
import { Input, InputGroup,InputLeftAddon } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { HTMLInputTypeAttribute} from "react";

interface MovieProps {
    movie: Movie[];
}

export function getMovies(movies: Movie[]): Movie[] {
    const MovieCopy = movies.map((movies: Movie): Movie => ({...movies}));
    return MovieCopy;
}

//const productArray = getMovies(Movie);
 
export function MovieProperty(props: MovieProps){
    const MovieList = props;
}
 
 
export function SuperAddMovie(): JSX.Element {
    const [name, setName] = React.useState("");
    const [poster, setPoster] = React.useState("");
    //const [year, setYear] = React.useState("");
    const [year, setYear] = useState<number>(0);
    const [actors, setActors] = useState<string[]>([]);
    //const [actors, setActors] = React.useState("");
    const [plot, setPlot] = React.useState("");
    const [director, setDirector] = React.useState("");
    const [genre, setGenre] = useState<string[]>([]);
    //const [genre, setGenre] = React.useState("");
    const [rating, setRating] = useState<number>(1);

    function nameChange (event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value);
    }

    function posterChange (event: React.ChangeEvent<HTMLInputElement>){
        setPoster(event.target.value);
    }

    function yearChange (event: React.ChangeEvent<HTMLInputElement>){
        setYear(parseInt(event.target.value));
    }

    function actorsChange (event: React.ChangeEvent<HTMLInputElement>){
        setActors([...actors, event.target.value]);
    }

    function plotChange (event: React.ChangeEvent<HTMLInputElement>){
        setPlot(event.target.value);
    }

    function directorChange (event: React.ChangeEvent<HTMLInputElement>){
        setDirector(event.target.value);
    }

    function genreChange (event: React.ChangeEvent<HTMLInputElement>){
        setGenre([...genre, event.target.value]);
    }

    function ratingChange (event: React.ChangeEvent<HTMLInputElement>){
        setRating(parseInt(event.target.value));
    }

    function addMovie(name:string, poster: string, year: number, actors:string[], plot:string, director:string, genre:string, rating:number):Movie {
        const addMovie = {
            name: name,
            poster: poster,
            year: year,
            actors: actors,
            plot: plot,
            director: director,
            genre: genre,
            rating: rating
        };
        return addMovie;
    }   
 
    function updateMovies (movies: Movie[]): Movie[] {
        const movieCopy = [...movies];
        const locat = addMovie(name, poster, year, actors, plot, director, genre, rating);
        const updatedMovie = [...movieCopy, locat];
        return updatedMovie;
    }
    
    const newList = updateMovies(movie);

    return(
        <Box>
            <Heading h="2vh" size="lg" style={{"fontFamily": "'Georgia', sans-serif"}}>Locations Providing Free Products</Heading>
            <Accordion p="8vh">
                {newList.map((Movie)=>(
                    //name, poster, year, actors, plot, director, genre, rating
                    <AccordionItem key={Movie.name}>
                        <AccordionButton>
                            <AccordionIcon/>
                            <Box>
                                <text>{Movie.name}</text>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel>
                            Poster: {Movie.poster}
                            <Spacer></Spacer>
                            Year Hours: {Movie.year}
                            <Spacer></Spacer>
                            Actors: {Movie.actors}
                            <Spacer></Spacer>
                            Plot: {Movie.plot}
                            <Spacer></Spacer>
                            Director: {Movie.director}
                            <Spacer></Spacer>
                            Genre: {Movie.genre}
                            <Spacer></Spacer>
                            Rating: {Movie.rating}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            <Spacer></Spacer>
            <Heading size ="md" style={{"fontFamily": "'Georgia', sans-serif"}}>Add a New Location:</Heading>
            <Stack spacing={1}>
                <InputGroup p="7vh">
                    <InputLeftAddon>Movie Name</InputLeftAddon>
                    <Input onChange={nameChange} variant="filled" placeholder="Insert Movie Name"></Input>
                    <Spacer></Spacer>

                    <InputLeftAddon>Poster</InputLeftAddon>
                    <Input onChange={posterChange} variant="filled" placeholder="Insert Poster"></Input>

                    <InputLeftAddon>Year</InputLeftAddon>
                    <Input onChange={yearChange} variant="filled" placeholder="Insert Year Published"></Input>

                    <InputLeftAddon>Actors</InputLeftAddon>
                    <Input onChange={actorsChange} variant="filled" placeholder="Insert Actor"></Input>

                    <InputLeftAddon>Plot</InputLeftAddon>
                    <Input onChange={plotChange} variant="filled" placeholder="Insert Plot"></Input>

                    <InputLeftAddon>Director</InputLeftAddon>
                    <Input onChange={directorChange} variant="filled" placeholder="Insert Director"></Input>

                    <InputLeftAddon>Genre</InputLeftAddon>
                    <Input onChange={genreChange} variant="filled" placeholder="Insert Genre"></Input>

                    <InputLeftAddon>rating</InputLeftAddon>
                    <Input onChange={ratingChange} variant="filled" placeholder="Insert Rating"></Input>
                </InputGroup>
            </Stack>
        </Box>
    );
}
 
 