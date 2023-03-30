# Prisoner’s dilemma
# Note that in Axelrod package, the cooperator strategy refers to ‘C’ and defector strategy refers to ‘D’.

import axelrod as axl
players = (axl.Defector(), axl.Defector())  # 두 플레이어는 각각 NE인 (D,D) 전략을 취함.            
match1 =   axl.Match(players, turns =10)    # 10번 돌림                      
print("match1 :", match1.play())
print(match1.game)
print(match1.scores())

print("") 
print("================================") 
print("")

""" 
<Tit-for-Tat strategy>
In the first round, Player A cooperates and plays the “cooperate” strategy. On every round after this, Player A cooperates if Player B cooperated in the previous round and defects if Player B defected in the previous round. Thus Tit-for-Tat strategy means Player A needs to do whatever Player B did in the previous round.
This strategy works because it gives immediate punishment for defection and immediate reward for cooperation. This can give rise to the Pareto efficient outcome of (C, C) ultimately
""" 

players = (axl.TitForTat(), axl.Random())  # 플레이어 1은 TFT전략을, 플레이어 2는 임의의 전략을 선택             
match2 =   axl.Match(players, turns =20)                          
print("match2 :", match2.play())
print(match2.game)
print(match2.scores())

print("") 
print("================================") 
print("")

players = (axl.Cooperator(), axl.Alternator()) # 플레이어 1은 C 전략을, 플레이어 2는 교대 전략을 선택
match3 = axl.Match(players, 5)
print(match3.play())

print("") 
print("================================") 
print("")

players = (axl.Cooperator(), axl.Alternator()) # 플레이어 1은 C 전략을, 플레이어 2는 교대 전략을 선택
match4 = axl.Match(players, 5, noise=0.2) # Noise is the probability with which any action dictated by a strategy will be swapped
print(match4.play())

print("") 
print("================================") 
print("")

players = (axl.Cooperator(), axl.Alternator())
match = axl.Match(players, 25)
print(match.play())
print(match.sparklines(c_symbol='C', d_symbol='D'))