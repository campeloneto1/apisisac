<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalaUser extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'escalas_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['escala', 'user', 'posto'];


     public function escala()
    {
        return $this->belongsTo(Escala::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posto()
    {
        return $this->belongsTo(EscalaPosto::class);
    }
}
