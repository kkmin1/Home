import axelrod as axl
players = [s() for s in axl.demo_strategies]  # Create players
tournament = axl.Tournament(players, seed=1)  # Create a tournament
results = tournament.play()  # Play the tournament
print(results.ranked_names)