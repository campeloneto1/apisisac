<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrsoUser extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'irsos_users';

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
    protected $with = [ 'user', 'posto'];    

   
    public function irso()
    {
        return $this->belongsTo(Irso::class);
    }

     public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posto()
    {
        return $this->belongsTo(Posto::class);
    }
}
