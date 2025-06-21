import requests
import sys
import re

# python3 scraper.py <valid chess.com username>
#
# Scrape user game history for standard rule chess games
# Write moves to txt files for later use
# Print links for archives being searched and amount of games played
#   as either color pieces

def parsePgn(pgn):
    arr = pgn.split('\n')

    for a in arr:
        if a.startswith('[') or not a.strip():
            continue

        # Remove ellipses, timestamps, weird whitespace, and black's move numbers
        cleaned_pgn = re.sub(r"\{[^}]*\}", "", a)
        cleaned_pgn = re.sub(r"\.\.\.", "", cleaned_pgn)
        cleaned_pgn = re.sub(r"\s+", " ", cleaned_pgn).strip()
        formatted_pgn = re.sub(r"(\d+)\. (\S+) (\d+) (\S+)", r"\1. \2 \4", cleaned_pgn)
        return formatted_pgn
    
    print("Missed a PGN, this should not ever print if it does idk what to tell u")
    return None

def scrape():
    # Request headers
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Access player game archive
    url = f'https://api.chess.com/pub/player/{sys.argv[1]}/games/archives'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        json = response.json()

        # Output data
        white = []
        black = []
        count_white = 0
        count_black = 0

        # Access users monthly archives
        for archive_url in json['archives']:
            print("Accessing " + archive_url)

            r = requests.get(archive_url, headers=headers)
            
            if r.status_code == 200:
                j = r.json()
                
                # Access each game in monthly archive
                for game in j.get('games', []):

                    # Skip chess variants
                    if game.get('rules', {}).lower() != 'chess':
                        print("Skipping " + game.get('rules', {}).lower() + " game")
                        continue 
                    elif game.get('initial_setup') != "":
                        print("Skipping game with initial setup")
                        continue

                    # Assert player color
                    white_player = game.get('white', {}).get('username', '').lower()
                    black_player = game.get('black', {}).get('username', '').lower()
                                    
                    if white_player == sys.argv[1].lower():
                        pgn = game.get('pgn', None)
                        if pgn:
                            white.append(pgn)
                            count_white += 1
                    elif black_player == sys.argv[1].lower():
                        pgn = game.get('pgn', None)
                        if pgn:
                            black.append(pgn)
                            count_black += 1
            else:
                print(f"Failed to fetch archive: {archive_url} with status code {r.status_code}")

        # Write output data to files
        with open(f"{sys.argv[1]}_white.txt", "w") as wf, open(f"{sys.argv[1]}_black.txt", "w") as bf:
            for wi in white:
                wf.write(parsePgn(wi))
                wf.write("\n")
            for bi in black:
                bf.write(parsePgn(bi))
                bf.write("\n")

        # Write output data to terminal
        print(f"Games played as White: {count_white}")
        print(f"Games played as Black: {count_black}")
    else:
        print(f"Failed to fetch archives with status code: {response.status_code}, perhaps an invalid username?")

scrape()