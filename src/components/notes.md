# The stucture and props pass flow

- AllGroups

(add)
_add_
_count_
_onGroupAdd_
(showAll)
_key_
_group_
_allGroups_
_onCardsChange_

- Group
  _group_
  _onCardsChange_
  - AllCards and NewCard  
     _card_
    _key_
    _index_
    _group_
    _onCardsChange_ _count_
    - Card
    - EditCard
      _card_
      _group_
      _onCardsChange_
      _addChecklist_
      _onAddChecklists_
      - Checklist
        _checklist_
        _onCardsCHange_
      - AddTodo
