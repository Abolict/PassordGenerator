PassordGenerator

En simpel men sikker passordgenerator som kjører 100% lokalt i nettleseren.
Ingen data lagres eller sendes til server, alt genereres direkte i JavaScript.

-------------------------------------------------------------------------------

FUNKSJONER

Genererer sterke tilfeldige passord

Velg passordlengde (6–36 tegn)

Valg av tegnsett:

små bokstaver

store bokstaver

tall

symboler

Styrkeindikator med entropiberegning

Kopier til utklippstavle

Vis / skjul passord

Lett og rask, ingen backend

---------------------------------------------------------------------------------

HVORDAN DET FUNGERER

Passordene genereres med crypto.getRandomValues(), som bruker nettleserens kryptografisk sikre tilfeldige generator.

Styrken på passordet estimeres ved å beregne entropi (bits) basert på:

passordlengde

størrelsen på tegnsettet som brukes

Dette gir en indikasjon på hvor vanskelig passordet er å brute-force.

-----------------------------------------------------------------------------------

## License
MIT
