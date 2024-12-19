import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Tables } from '@/utils/database.types';

type Author = Omit<Tables<'author'>, 'img_url'>;

interface Props {
    setAuthor: (a: string | null) => void;
    setAuthorId: (i: string | null) => void;
}
export default function SelectAuthor({setAuthor, setAuthorId}: Props) {
    // const { data: authors } = useFetch('author')
    const authors: Author[] = [
        { "id": 1, "last_name": "Homer", "first_name": null },
        { "id": 2, "last_name": "Aeschylus", "first_name": null },
        { "id": 3, "last_name": "Sophocles", "first_name": null },
        { "id": 4, "last_name": "Euripides", "first_name": null },
        { "id": 5, "last_name": "Aristophanes", "first_name": null },
        { "id": 6, "last_name": "Herodotus", "first_name": null },
        { "id": 7, "last_name": "Thucydides", "first_name": null },
        { "id": 8, "last_name": "Plato", "first_name": null },
        { "id": 9, "last_name": "Aristotle", "first_name": null },
        { "id": 10, "last_name": "Hippocrates", "first_name": null },
        { "id": 11, "last_name": "Galen", "first_name": null },
        { "id": 12, "last_name": "Euclid", "first_name": null },
        { "id": 13, "last_name": "Archimedes", "first_name": null },
        { "id": 14, "last_name": "Nicomachus", "first_name": null },
        { "id": 15, "last_name": "Lucretius", "first_name": null },
        { "id": 16, "last_name": "Epictetus", "first_name": null },
        { "id": 17, "last_name": "Aurelius", "first_name": "Marcus" },
        { "id": 18, "last_name": "Plotinus", "first_name": null },
        { "id": 19, "last_name": "Virgil", "first_name": null },
        { "id": 20, "last_name": "Plutarch", "first_name": null },
        { "id": 21, "last_name": "Tacitus", "first_name": null },
        { "id": 22, "last_name": "Ptolemy", "first_name": "Claudius" },
        { "id": 23, "last_name": "Copernicus", "first_name": "Nicolaus" },
        { "id": 24, "last_name": "Kepler", "first_name": "Johannes" },
        { "id": 25, "last_name": "Augustine", "first_name": null },
        { "id": 26, "last_name": "Aquinas", "first_name": "Thomas" },
        { "id": 27, "last_name": "Dante", "first_name": null },
        { "id": 28, "last_name": "Chaucer", "first_name": "Geoffrey" },
        { "id": 29, "last_name": "Calvin", "first_name": "John" },
        { "id": 30, "last_name": "Machiavelli", "first_name": "Nicolo" },
        { "id": 31, "last_name": "Hobbes", "first_name": "Thomas" },
        { "id": 32, "last_name": "Rabelais", "first_name": "François" },
        { "id": 33, "last_name": "Erasmus", "first_name": "Desiderius" },
        { "id": 34, "last_name": "Montaigne", "first_name": "Michel de" },
        { "id": 35, "last_name": "Shakespeare", "first_name": "William" },
        { "id": 36, "last_name": "Gilbert", "first_name": "William" },
        { "id": 37, "last_name": "Galileo", "first_name": null },
        { "id": 38, "last_name": "Harvey", "first_name": "William" },
        { "id": 39, "last_name": "Cervantes", "first_name": "Miguel de" },
        { "id": 40, "last_name": "Bacon", "first_name": "Francis" },
        { "id": 41, "last_name": "Descartes", "first_name": "René" },
        { "id": 42, "last_name": "Spinoza", "first_name": "Benedict de" },
        { "id": 43, "last_name": "Milton", "first_name": "John" },
        { "id": 44, "last_name": "Pascal", "first_name": "Blaise" },
        { "id": 45, "last_name": "Molière", "first_name": null },
        { "id": 46, "last_name": "Racine", "first_name": "Jean" },
        { "id": 47, "last_name": "Newton", "first_name": "Isaac" },
        { "id": 48, "last_name": "Huygens", "first_name": "Christiaan" },
        { "id": 49, "last_name": "Locke", "first_name": "John" },
        { "id": 50, "last_name": "Hume", "first_name": "David" },
        { "id": 51, "last_name": "Berkeley", "first_name": "George" },
        { "id": 52, "last_name": "Swift", "first_name": "Jonathan" },
        { "id": 53, "last_name": "Voltaire", "first_name": null },
        { "id": 54, "last_name": "Diderot", "first_name": "Denis" },
        { "id": 55, "last_name": "Montesquieu", "first_name": "Robert de" },
        { "id": 56, "last_name": "Rousseau", "first_name": "Jean-Jacques" },
        { "id": 57, "last_name": "Smith", "first_name": "Adam" },
        { "id": 58, "last_name": "Gibbon", "first_name": "Edward" },
        { "id": 59, "last_name": "Kant", "first_name": "Immanuel" },
        { "id": 60, "last_name": "Jefferson", "first_name": "Thomas" },
        { "id": 61, "last_name": "Dickinson", "first_name": "Emily" },
        { "id": 62, "last_name": "Madison", "first_name": "James" },
        { "id": 63, "last_name": "Hamilton", "first_name": "Alexander" },
        { "id": 64, "last_name": "Mill", "first_name": "John Stuart" },
        { "id": 65, "last_name": "Boswell", "first_name": "James" },
        { "id": 66, "last_name": "Lavoisier", "first_name": "Antoine" },
        { "id": 67, "last_name": "Faraday", "first_name": "Michael" },
        { "id": 68, "last_name": "Hegel", "first_name": "Georg Wilhelm Friedrich" },
        { "id": 69, "last_name": "Kierkegaard", "first_name": "Soren" },
        { "id": 70, "last_name": "Nietzsche", "first_name": "Friedrich" },
        { "id": 71, "last_name": "Tocqueville", "first_name": "Alexis de" },
        { "id": 72, "last_name": "Goethe", "first_name": "Johann Wolfgang von" },
        { "id": 73, "last_name": "Balzac", "first_name": "Honoré de" },
        { "id": 74, "last_name": "Austen", "first_name": "Jane" },
        { "id": 75, "last_name": "Eliot", "first_name": "George" },
        { "id": 76, "last_name": "Dickens", "first_name": "Charles" },
        { "id": 77, "last_name": "Melville", "first_name": "Herman" },
        { "id": 78, "last_name": "Twain", "first_name": "Mark" },
        { "id": 79, "last_name": "Darwin", "first_name": "Charles" },
        { "id": 80, "last_name": "Marx", "first_name": "Karl" },
        { "id": 81, "last_name": "Tolstoy", "first_name": "Leo" },
        { "id": 82, "last_name": "Dostoevsky", "first_name": "Fyodor" },
        { "id": 83, "last_name": "Ibsen", "first_name": "Henrik" },
        { "id": 84, "last_name": "James", "first_name": "William" },
        { "id": 85, "last_name": "Freud", "first_name": "Sigmund" },
        { "id": 86, "last_name": "Bergson", "first_name": "Henri" },
        { "id": 87, "last_name": "Dewey", "first_name": "John" },
        { "id": 88, "last_name": "Whitehead", "first_name": "Alfred North" },
        { "id": 89, "last_name": "Russell", "first_name": "Bertrand" },
        { "id": 90, "last_name": "Heidegger", "first_name": "Martin" },
        { "id": 91, "last_name": "Wittgenstein", "first_name": "Ludwig" },
        { "id": 92, "last_name": "Barth", "first_name": "Karl" },
        { "id": 93, "last_name": "Poincaré", "first_name": "Henri" },
        { "id": 94, "last_name": "Planck", "first_name": "Max" },
        { "id": 95, "last_name": "Einstein", "first_name": "Albert" },
        { "id": 96, "last_name": "Eddington", "first_name": "Arthur" },
        { "id": 97, "last_name": "Bohr", "first_name": "Niels" },
        { "id": 98, "last_name": "Hardy", "first_name": "G.H." },
        { "id": 99, "last_name": "Heisenberg", "first_name": "Werner" },
        { "id": 100, "last_name": "Schrödinger", "first_name": "Erwin" },
        { "id": 101, "last_name": "Dobzhansky", "first_name": "Theodosius" },
        { "id": 102, "last_name": "Waddington", "first_name": "C.H." },
        { "id": 103, "last_name": "Veblen", "first_name": "Thorstein" },
        { "id": 104, "last_name": "Tawney", "first_name": "R.H." },
        { "id": 105, "last_name": "Keynes", "first_name": "John Maynard" },
        { "id": 106, "last_name": "Frazer", "first_name": "James George" },
        { "id": 107, "last_name": "Weber", "first_name": "Max" },
        { "id": 108, "last_name": "Huizinga", "first_name": "Johan" },
        { "id": 109, "last_name": "Lévi-Strauss", "first_name": "Claude" },
        { "id": 110, "last_name": "James", "first_name": "Henry" },
        { "id": 111, "last_name": "Shaw", "first_name": "George Bernard" },
        { "id": 112, "last_name": "Conrad", "first_name": "Joseph" },
        { "id": 113, "last_name": "Chekhov", "first_name": "Anton" },
        { "id": 114, "last_name": "Pirandello", "first_name": "Luigi" },
        { "id": 115, "last_name": "Proust", "first_name": "Marcel" },
        { "id": 116, "last_name": "Cather", "first_name": "Willa" },
        { "id": 117, "last_name": "Mann", "first_name": "Thomas" },
        { "id": 118, "last_name": "Joyce", "first_name": "James" },
        { "id": 119, "last_name": "Woolf", "first_name": "Virginia" },
        { "id": 120, "last_name": "Kafka", "first_name": "Franz" },
        { "id": 121, "last_name": "Lawrence", "first_name": "D.H." },
        { "id": 122, "last_name": "Eliot", "first_name": "T.S." },
        { "id": 123, "last_name": "O'Neill", "first_name": "Eugene" },
        { "id": 124, "last_name": "Fitzgerald", "first_name": "F. Scott" },
        { "id": 125, "last_name": "Faulkner", "first_name": "William" },
        { "id": 126, "last_name": "Brecht", "first_name": "Bertolt" },
        { "id": 127, "last_name": "Hemingway", "first_name": "Ernest" },
        { "id": 128, "last_name": "Orwell", "first_name": "George" },
        { "id": 129, "last_name": "Beckett", "first_name": "Samuel" },
        { "id": 130, "last_name": "Bible", "first_name": null }
    ]

    return (
        <Autocomplete
            classNames={{
                base: "max-w-m",
                listboxWrapper: "bg-[lemonchiffon]",
                selectorButton: "text-default-500",
            }}
            size="lg"
            defaultItems={authors ?? []}
            label="Author"
            placeholder="Search or type author's name."
            color="warning"
            onInputChange={setAuthor}
            onSelectionChange={(n) => setAuthorId(String(n))}
            isRequired
            allowsCustomValue
        >
            {(author: Author) => <AutocompleteItem key={author.id}>{author.last_name}</AutocompleteItem>}
        </Autocomplete>
    )
}